const express = require('express');
const { signin, signup } = require('../controllers/users');
const authRouter = express.Router();

authRouter.get("/signup",(req,res)=>{
    res.render('signup');
});

authRouter.post("/signup",signup);

authRouter.get("/signin",(req,res)=>{
    res.render('signin');
});

authRouter.post("/signin",signin);

module.exports = authRouter;