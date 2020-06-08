const express = require('express');
const dashboardRouter = express.Router();
const isAuth = require("../middleware/isAuth");
const User = require('../models/User.js')

dashboardRouter.get('/dashboard/:username', isAuth, (req,res) => {
  user = req.user
  let usersSugesstions
  userNameParam = req.params.username;
  console.log('userNameParam : ' + userNameParam);
  console.log('userName en session : ' + user.username);

  if (user.username != userNameParam) {
    console.log('Pas le même utilisateur que la session ❌' );   
    res.redirect('/logout');
  } else {
    console.log(user.avatar)
    // User.getAllusers((users) => {
    //   usersSugesstions = [...users]
    //   console.log(usersSugesstions)
    // })
    res.render('dashboard', 
      {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter',
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        usersSugesstions : usersSugesstions
      } 
    )
  }
})

module.exports = dashboardRouter