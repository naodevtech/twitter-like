const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/', (req,res) => {
    res.render('home', {
        style: '/css/layouts/home.css'
    })
})

module.exports = homeRouter