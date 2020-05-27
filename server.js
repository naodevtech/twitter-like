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


// Route GET
app.get('/', (req,res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

// Gestion de cas d'erreur
app.get('*', (req,res) => {
    res.send('ERROR 404')
})


// Application Listen (http://localhost:3000/)
app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000')
})