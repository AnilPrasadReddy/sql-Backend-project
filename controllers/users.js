const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await User.createUser(name, email, password, role);
        if (result) {
            res.redirect('')
            return res.status(201).json({msg:"User created"});
        } else {
            return res.status(404).send('User not created');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie('token', token, {
            httpOnly: true,
        });

        if (user.role === 'host') {
            return res.redirect('/host/dashboard');
        }
        return res.redirect('/user/home');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    signup,
    signin
}
