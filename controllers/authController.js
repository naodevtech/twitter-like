const User = require('../models/User.js')

// Fonction permettant de créer un utilisateur via le modèle
exports.createUser = (req,res) => {
    let user = new User(req.body)
    User.create(req.body)
    // Redirection vers le dashboard
    res.redirect(`/dashboard/${user.username}`)
}