const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

module.exports = async function (req,res,next){
    try{
        if(!req.cookies.token){
            res.locals.currentUser = '';
            next();
        }else{
            let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
            let user = await userModel.findOne({email: decoded.email})
            .select("-password");
            res.locals.currentUser = user;
            next();
        }
    } catch(err){
        req.flash("error","Something went wrong");
        res.redirect("/");
    }
};