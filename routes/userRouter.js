const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController')
const isLoggedin = require('../middlewares/isLoggedIn');

router.get('/login',(req,res) => {
    let message = {
        success: req.flash("success"),
        error: req.flash("error")
    }
    res.render('login',{message});
 });
router.get('/signup',(req,res) => {
    let message = {
        success: req.flash("success"),
        error: req.flash("error")
    }
    res.render('signup',{message});
 });

router.post('/login',loginUser);
router.post('/create', registerUser);
router.get('/logout',logoutUser);

module.exports = router