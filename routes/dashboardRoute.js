const express = require('express');
const dashboardRouter = express.Router();
const isAuth = require("../middleware/isAuth");

dashboardRouter.get('/dashboard/:username', isAuth, (req,res) => {
 
  user = req.user
  userNameParam = req.params.username;
  console.log('userNameParam : ' + userNameParam);
  console.log('userName en session : ' + user.username);

  if (user.username != userNameParam) {
    console.log('Pas le même utilisateur que la session !!!' );
    res.redirect('/logout');
  } else {
    res.render('dashboard', 
      {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter',
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      } 
    )
  }
})

module.exports = dashboardRouter