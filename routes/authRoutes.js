// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js')

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
        title: 'Inscription / Twitter'
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
        res.redirect("/signup")
    } else if(req.body.password != req.body.passwordCheck){
        console.log('Mot de passe non-identique !')
        res.redirect('/signup')
    }
    // Recherche si le mail d'inscription n'existe pas déjà
    User.getUsersByEmail(req.body, (result) => {
        if(result.length > 0){
            res.redirect('/signup')
        } else {
            authController.createUser(req, res)
        }
    })
})

module.exports = authRouter