// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js')
const flash = require('connect-flash');
const session = require('express-session')

authRouter.use(session({
	secret:'happy dog',
	saveUninitialized: true,
	resave: true
}));

authRouter.use(flash());

// Page de connexion
authRouter.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css',
        title: 'Connexion / Twitter'
    })
})

// Page d'inscription
authRouter.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css',
        title: 'Inscription / Twitter',
        passwordCheck: req.flash('passwordCheck'),
        emailCheckExists: req.flash('emailCheckExists')
        

    })
})

// Validation du formulaire d'inscription avec POST
authRouter.post('/signup',[
    // Utilisation du module express-validator pour check les entrées
    check('password').isLength({ min: 6 }),
    check('tel').isNumeric(),
    check('email').isEmail()
  ],(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.redirect("/signup")
    } else if(req.body.password != req.body.passwordCheck){
        req.flash('passwordCheck', 'Les mots de passe ne sont pas identiques ! ')
        console.log('Mot de passe non-identique !')
        return res.redirect('/signup')
    }
    // Recherche si le mail d'inscription n'existe pas déjà
    else {
        User.getUsersByEmail(req.body, (result) => {
            if(result.length > 0){
                req.flash('emailCheckExists', 'Votre adresse e-mail existe déjà !')
                return res.redirect('/signup')
            } else {
                return authController.createUser(req, res)
            }
        })
    }
})

module.exports = authRouter