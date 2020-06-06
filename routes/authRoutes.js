// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js')
const flash = require('connect-flash');
const passport = require("passport");
const isAuth = require("../middleware/isAuth");

authRouter.use(flash());

// Page de connexion
authRouter.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css',
        title: 'Connexion / Twitter',
        errorPassword: req.flash('errorPassword'),
        userNotFound: req.flash('userNotFound')
    })
})

// Page d'inscription
authRouter.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css',
        title: 'Inscription / Twitter',
        passwordCheck: req.flash('passwordCheck'),
        emailCheckExists: req.flash('emailCheckExists'),
        errors: req.flash('errors'),
        usernameInvalid: req.flash('usernameInvalid')
    })
})

// Validation du formulaire d'inscription avec POST
authRouter.post('/signup',[
    // Utilisation du module express-validator pour check les entrées
    check('password').isLength({ min: 6 }),
    check('tel').isNumeric(),
    check('email').isEmail(),
  ], authController.verifiInput)

authRouter.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
);

authRouter.get(
    '/', isAuth,
    (req, res) => {
        username = req.user.username
    res.redirect('/dashboard/' + username)
})

authRouter.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/home');
});

module.exports = authRouter