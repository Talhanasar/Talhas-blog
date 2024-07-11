const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const upload = require('../config/multer-config');
const userModel = require("../models/userModel");
const profileEdit = require('../controllers/profileEdit');


router.get('/:id', isLoggedIn, async (req, res) => {
    let message = {
        error: req.flash("error"),
        success: req.flash("success")
    }
    let user = await userModel.findOne({ _id: req.params.id });
    res.render('profile', { user, currentUser: req.user, message });
});
router.get('/:id/edit', isLoggedIn, (req, res) => {
    res.render('edit', { user: req.user });
});
router.post('/:id/edit', isLoggedIn, upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'BG', maxCount: 1 }
]),profileEdit);

module.exports = router