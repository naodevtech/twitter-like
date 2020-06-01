const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

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

authRouter.post('/signup',[
    check('password').isLength({ min: 6 }),
    check('tel').isNumeric(),
    check('email').isEmail()
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.redirect("/signup")
    } else if(req.body.password != req.body.passwordCheck){
        console.log('nooooooo')
        return res.redirect('/signup')
    }
    authController.createUser(req,res)
})

module.exports = authRouter