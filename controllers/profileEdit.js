const userModel = require('../models/userModel');
const upload = require('../config/multer-config');

module.exports = async function (req, res){
    try {
        let { name, username } = req.body;
        let user = await userModel.findOne({ _id: req.params.id });
        let image;
        let bgImage;

        if (req.files['profile']) {
            image = {
                data: req.files['profile'][0].buffer,
                contentType: req.files['profile'][0].mimetype
            };
        } else {
            image = user.image.data ? user.image : { data: '', contentType: '' };
        }

        if (req.files['BG']) {
            bgImage = {
                data: req.files['BG'][0].buffer,
                contentType: req.files['BG'][0].mimetype
            };
        } else {
            bgImage = user.bgImage.data ? user.bgImage : { data: '', contentType: '' };
        }

        await userModel.findOneAndUpdate({ _id: user._id }, {
            name,
            username,
            image,
            bgImage
        });

        req.flash("success", "Changes saved!"); 
        res.redirect(`/profile/${req.params.id}`);
    } catch (err) {
        console.log(err.message);
        req.flash("error", "Something went wrong");
        res.redirect(`/profile/${req.params.id}`);
    }
};
