// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js')
const flash = require('connect-flash');
const session = require('express-session')
const bcrypt = require('bcrypt');

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
  ],(req,res) => {
    const exp = new RegExp("^[a-zA-Z0-9]{3,8}$","g");
    const errors = validationResult(req);
    // Si les check ne sont pas vérifié
    if (!errors.isEmpty()){
        req.flash('errors', "Une erreur a été détéctée, le mot de passe doit contenir un minimum de 6 caractères, le numéro de téléphone doit être inscrit en chiffres et l'email doit être un email (email@gmail.com)")
        return res.redirect("/signup")
    } else if(req.body.password != req.body.passwordCheck){
        req.flash('passwordCheck', 'Les mots de passe ne sont pas identiques ! ')
        console.log('Mot de passe non-identique ! ❌')
        return res.redirect('/signup')
    } else if(!exp.test(req.body.username)){
        req.flash('usernameInvalid', "Nom d'utilisateur incorrect ! Le nom d'utilisateur ne peut contenir que 3 à 8 caractères et des caractères comme [A-Z], [a-z] et [0-9]")
        return res.redirect('/signup')
    }
    // Recherche si le mail d'inscription n'existe pas déjà
    else {
        User.getUsersByEmailOrUsername(req.body, (result) => {
            if(result.length > 0){
                req.flash('emailCheckExists', "Votre adresse e-mail ou votre nom d'utilisateur existe déjà !")
                return res.redirect('/signup')
            } else {
                return authController.createUser(req, res)
            }
        })
    }
})

authRouter.post('/login', (req, response) => {
    User.getUsersByEmailOrUsername(req.body, (result) => {
        console.log(req.body.email)
        if(result.length > 0){
            console.log('trouvé')
            bcrypt.compare(req.body.password, result[0].password, function(err, res){
                if(res){
                   return response.redirect(`/dashboard/${result[0].username}`)
                } else{
                    req.flash('errorPassword', 'Votre mot de passe est incorrect ! ')
                    return response.redirect('/login')
                }
            })
        } 
        else {
            req.flash('userNotFound', "Il semble que votre email ou votre username n'existe pas!")
            return response.redirect('/login')
        }
    })
})

module.exports = authRouter