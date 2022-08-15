const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const users = require('../controllers/users')

router.get('/register', users.renderRegister)

router.post('/register', users.register)

router.get('login',users.renderLogin)

router.post('/login',[
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'A password is required').exists()
    ],users.login)

router.get('/logout', users.logout)

module.exports = router;
