const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

const userRouter = require('./routes/userRouter');
const profileRouter = require('./routes/profileRouter');
const blogRouter = require('./routes/blogRouter');
const userModel = require('./models/userModel');
const postModel = require('./models/postModel');
const db = require('./config/mongodb-connection');
const getProfile = require('./middlewares/getProfile');
 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(expressSession({
   resave: false,
   saveUninitialized: false,
   secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());
app.set('view engine','ejs');
app.use((req,res,next)=>{
    res.locals.page = req.path.substring(1) || 'home';
    next();
}) ;

app.get('/',getProfile,(req,res) => {
   let message = {
      error: req.flash("error"),
      success: req.flash("success")
   }
   res.render('home',{message});
});
app.get('/about',getProfile,(req,res) => {
   res.render('about');
});

app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/blog', blogRouter);
 
app.listen(3000);

module.exports = router;