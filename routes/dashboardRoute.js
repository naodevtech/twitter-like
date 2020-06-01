const express = require('express')
const dashboardRouter = express.Router()

dashboardRouter.get('/dashboard', (req,res) => {
    res.render('dashboard', {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter'
    })
})

module.exports = dashboardRouter