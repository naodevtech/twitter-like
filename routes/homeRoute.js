const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/home', (req,res) => {
    res.render('home', {
        style: '/css/layouts/home.css',
        title: "Twitter. C'est ce qui se passe dans le monde"
    })
})

module.exports = homeRouter