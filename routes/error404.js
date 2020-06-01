const express = require('express')
const errorRouter = express.Router()

errorRouter.get('*', (req,res) => {
    res.send('ERROR 404')
})

module.exports = errorRouter