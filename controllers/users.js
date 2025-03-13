const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { use } = require('../Routers/authRouter');
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await User.createUser(name, email, password, role);
        if (result) {
            res.redirect('/login');
        } else {
            res.status(404).send('User not created');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const signin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findByEmail(email);;
        if(!user){
            return res.status(404).json({msg:'User not found'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Crendentials"});
        }
        const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.cookie('token',token,{
            httpOnly:true
        });
        if(user.role === 'host'){
            res.redirect('/host/dashboard');
        }
        res.redirect('/user/home');
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

module.exports={
    signup,
    signin
}