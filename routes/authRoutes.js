const express = require('express')
const authRouter = express.Router()
const connection = require('../config/connectionDb')
const User = require('../models/User.js')

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

authRouter.post('/signup', (req,res) =>{
    let user = new User(req.body)
    console.log(user)
    var sql = `INSERT INTO users(lastname, firstname, birthdate, gender, city, email, password, username, avatar) VALUES('${user.familyName}', '${user.name}', '${user.birthdate}', '${user.feminin}', '${user.city}', '${user.email}', '${user.password}', '${user.username}', 'Hello')`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("User Insert Success!");
      connection.end()
    });
    res.send('ok')
})


module.exports = authRouter