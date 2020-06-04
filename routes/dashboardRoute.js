const express = require('express');
const dashboardRouter = express.Router();
const isAuth = require("../middleware/isAuth");

dashboardRouter.get('/dashboard/:username', isAuth, (req,res) => {
 
  user = req.user
  res.render('dashboard', {
    style: '/css/layouts/dashboard.css',
    title: 'Accueil / Twitter',
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  })
})

module.exports = dashboardRouter