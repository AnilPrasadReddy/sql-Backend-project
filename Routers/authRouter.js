const express = require('express');
const { signin, signup } = require('../controllers/users');
const authRouter = express.Router();

authRouter.get("/signup",(req,res)=>{
    res.render('signup');
});

authRouter.post("/signup",signup);

authRouter.get("/login",(req,res)=>{
    res.render('login');
});

authRouter.post("/login",login);

module.exports = authRouter;