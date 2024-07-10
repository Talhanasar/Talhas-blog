const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const getProfile = require('../middlewares/getProfile');
const router = express.Router();
const upload = require('../config/multer-config');
const userModel = require("../models/userModel")

 
router.get('/:id',isLoggedIn,(req,res) => {
    let message = {
        error: req.flash("error"),
        success: req.flash("success")
    }
    res.render('profile',{user:req.user,message});
 });
router.get('/:id/edit',isLoggedIn,(req,res) => {
    res.render('edit',{user:req.user});
 });
router.post('/:id/edit',isLoggedIn,upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'BG', maxCount: 1 }
  ]),async (req,res) => {
    let {name,username} = req.body;
    let image  = {
        data: '',
        contentType: ''
    };
    let bgImage  = {
        data: '',
        contentType: ''
    };

    if (req.files['profile']) {
         image = {
            data: req.files['profile'][0].buffer,
            contentType: req.files['profile'][0].mimetype
         }
    }
    if (req.files['BG']) {
        bgImage = {
            data: req.files['BG'][0].buffer,
            contentType: req.files['BG'][0].mimetype
         }
    }
    await userModel.findOneAndUpdate({ _id: req.params.id},{
        name,
        username,
        image,
        bgImage
    });
    req.flash("Success","Changes saved!");
    res.redirect('/profile/'+ req.params.id);
 });

module.exports = router