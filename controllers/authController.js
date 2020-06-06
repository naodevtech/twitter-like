const User = require('../models/User.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { check, validationResult } = require('express-validator');

// Fonction permettant de créer un utilisateur via le modèle
exports.createUser = (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hashPwd) {
        if (err) console.log('hash : ' + err) ;
        User.create(req.body, hashPwd)
        // Redirection vers le dashboard
        console.log('Redirection vers le dashboard') ;
        res.redirect(`/login`)
    })
}

exports.checkSignupInputs = (req,res) => {
    const exp = new RegExp("^[a-zA-Z0-9]{3,12}$","g");
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
                // Fonction permettant de créer un utilisateur via le modèle
                bcrypt.hash(req.body.password, saltRounds, function(err, hashPwd) {
                    if (err) console.log('hashage ▶️ : ' + err) ;
                    User.create(req.body, hashPwd)
                    req.flash('sucessSignup', 'Inscription réussie ! ')
                    return res.redirect(`/login`)
                })
            }
        })
    }
}