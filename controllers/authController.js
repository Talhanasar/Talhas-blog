const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.loginUser = async (req, res) => {
    try {
        let {email, password} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(!result){
                    req.flash("error","Invalid Email/Password");
                    return res.redirect("/user/login");
                } 
                let token = generateToken(user);
                res.cookie("token",token);
                req.flash("success","Logged in Successfully!");
                res.redirect("/");
            });
        }else{
            req.flash("error","Invalid Email/Password");
            res.redirect("/user/login");
        }

    } catch (err) {
        res.status(404).send(err.message);
    }
}
module.exports.registerUser = async (req, res) => {
    try {
        let { name, username, email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user){
            req.flash("error","Account already exists");
            return res.redirect("/user/signup");

        } 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);

                let user = await userModel.create({
                    name,
                    username,
                    email,
                    password: hash
                });
                let token = generateToken(user);
                res.cookie("token", token);
                req.flash("success","Welcome to talhas duniya!");
                res.redirect("/")
            })
        });

    } catch (err) {
        res.status(404).send(err.message);
    }
}

module.exports.logoutUser = async (req,res)=>{
    try{
        res.cookie("token","");
        res.redirect("/");
    }catch(err){
        res.status(404).send(err.message);
    }
}