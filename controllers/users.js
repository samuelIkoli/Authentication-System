const User = require('../models/userModels');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {SECRET} = process.env

module.exports.renderRegister = (req, res) => {
    console.log('cat')
    res.send('cat')
}

module.exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const exists = await User.findOne({email})
        if (exists){
            req.flash('user already exists')
            res.redirect('/register')
        }
        const user = new User({ email, password, role });
        await user.save();
        req.flash('logged in successfully')
        res.redirect('/index')

    } catch (e) {
        console.error(err.message);
        res.status(500).send('server error');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('/login')
}

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid Credentials'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid Credentials'
            });
        }
        const payload = {
            user: {
                id: user.id,
            }
        };
        jwt.sign(payload, SECRET, {expiresIn: 360000}, (err, token)=>{
            if (err) throw err;
            res.redirect('/views/index', {user})
        })
    } catch (error) {
        console.error(err.message);
        res.status(500).send('server error');
    }
}

module.exports.logout = (req, res) => {
    res.redirect('/');
}