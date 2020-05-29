const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');

authRouter.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css'
    })
})

authRouter.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css'
    })
})

authRouter.post('/signup', authController.createUser)

module.exports = authRouter