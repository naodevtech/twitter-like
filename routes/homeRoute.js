const express = require('express')
const homeRouter = express.Router()
const User = require('../models/User.js')
const flash = require('connect-flash');
const passport = require("passport");
const isAuth = require("../middleware/isAuth");

homeRouter.get('/home', (req,res) => {
    res.render('home', {
        style: '/css/layouts/home.css',
        title: "Twitter. C'est ce qui se passe dans le monde"
    })
})

homeRouter.post('/home', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

module.exports = homeRouter