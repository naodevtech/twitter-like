const User = require('../models/User.js')


exports.createUser = (req,res) => {
    let user = new User(req.body)
    console.log(user)
    User.create(req.body)
    res.send('ok')
}