const express = require('express')
const errorRouter = express.Router()

// Page d'erreur 404
errorRouter.get('*', (req,res) => {
    res.send('ERROR 404')
})

module.exports = errorRouter