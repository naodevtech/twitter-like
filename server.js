// Importation module npm
const express = require('express')
const exphbs  = require('express-handlebars');

// Instanciation d'Express 
const app = express()

// Configuration moteur de template Handlebars et express.static()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Route GET
app.get('/', (req,res) => {
    res.render('home', {
        name: "Sylvie"
    })
})


// Application Listen (http://localhost:3000/)
app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000')
})