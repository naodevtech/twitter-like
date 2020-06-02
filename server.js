// Importation module npm
const express = require('express')
const exphbs  = require('express-handlebars');

// Instanciation d'Express
const app = express()

// Configuration moteur de template Handlebars et express.static()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// Pour récuperer les requêtes liée au req.body
app.use(express.urlencoded({
    extended: false
}));

app.use(require('./routes/authRoutes.js'))
app.use(require('./routes/homeRoute.js'))
app.use(require('./routes/dashboardRoute.js'))
app.use(require('./routes/error404.js'))


// Application Listen (http://localhost:3000/)
app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000')
})

