const express = require('express')
const dashboardRouter = express.Router()
const connection = require('../config/connectionDb.js')

// Page Dashboard
dashboardRouter.get('/dashboard/:username', (req,res) => {
    let usersInfos = []
    let usernameParams = req.params.username
    var sql = `SELECT * FROM users WHERE username = '${usernameParams}'`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      usersInfos.push(...result)
      console.log('infos utilisateur envoyé sur le dashboard ▶️ : ' , usersInfos[0])
      res.render('dashboard', {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter',
        username: usersInfos[0].username,
        firstname: usersInfos[0].firstname,
        lastname: usersInfos[0].lastname,
    })
    });
})

module.exports = dashboardRouter