const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const getProfile = require('../middlewares/getProfile');
const router = express.Router();
const postModel = require('../models/postModel');

 
router.get('/',isLoggedIn,getProfile, async(req,res) => {
    let posts = await postModel.find().populate('user');
    let userId = req.user._id;
    res.render('blog',{posts,userId});
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