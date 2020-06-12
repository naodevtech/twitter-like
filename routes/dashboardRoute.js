const express = require('express')
const dashboardRouter = express.Router()
const isAuth = require("../middleware/isAuth")
const tweetController = require('../controllers/tweetController.js')
const Tweet = require('../models/Tweet.js');
const User = require('../models/User.js')

dashboardRouter.get('/dashboard/:username', isAuth, (req,res) => {
  user = req.user
  userNameParam = req.params.username
  // console.log('userNameParam : ' + userNameParam);
  console.log('id du user en session : ' + user.id_user);
  if (user.username != userNameParam) {
    console.log('Pas le même utilisateur que la session ❌' );   
    res.redirect('/logout')
  } else {
    Tweet.getAllTweets(user.username, (result) => {
      // console.log(result)
      res.render('dashboard', 
      {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter',
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        result: [...result],
        certified: user.certified
      } 
    )
    })
  }
})

dashboardRouter.post('/dashboard/:username', isAuth, (req,res) => {
  tweetController.createTweet(req,res)
})

module.exports = dashboardRouter