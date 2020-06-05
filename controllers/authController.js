const User = require('../models/User.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Fonction permettant de créer un utilisateur via le modèle
exports.createUser = (req,res) => {
    const user = new User(req.body)
    bcrypt.hash(req.body.password, saltRounds, function(err, hashPwd) {
        if (err) console.log('hash : ' + err) ;
        User.create(req.body, hashPwd)
        // Redirection vers le dashboard
        console.log('Redirection vers le dashboard') ;
        res.redirect(`/login`)
    })
}