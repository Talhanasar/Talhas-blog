const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const postModel = require('../models/postModel');

 
router.get('/',isLoggedIn, async(req,res) => {
    let posts = await postModel.find().populate('user');
    res.render('blog',{posts});
 });
router.post('/',isLoggedIn, async(req,res) => {
    let {data} = req.body;
    let post = await postModel.create({
        user: req.user._id,
        postData: data
    });
    res.redirect('/blog');
 });

module.exports = router