const express = require('express')
const dashboardRouter = express.Router()
const connection = require('../config/connectionDb.js')

// Page Dashboard
dashboardRouter.get('/dashboard/:username', (req,res) => {
    let array = []
    let usernameParams = req.params.username
    var sql = `SELECT * FROM users WHERE username = '${usernameParams}'`
    connection.query(sql, function (err, result) {
      if (err) throw err;
      array.push(result[0].username)
    });
    res.render('dashboard', {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter',
        array: array
    })
})

module.exports = dashboardRouter