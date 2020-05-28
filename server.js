// Importation module npm
const express = require('express')
const exphbs  = require('express-handlebars');
const mysql = require('mysql')
require('dotenv').config()

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

//config DB mysql with dotenv
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    // socketPath: "/var/run/mysqld/mysqld.sock",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, lastname TEXT, firstname TEXT, datebirth DATE, gender TEXT, city TEXT, email TEXT, password TEXT, username TEXT, avatar TEXT)";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      connection.end()
    });
});

// Route GET
app.get('/', (req,res) => {
    res.render('home', {
        style: '/css/layouts/home.css'
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css'
    })
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css'
    })
})

// Gestion de cas d'erreur
app.get('*', (req,res) => {
    res.send('ERROR 404')
})


// Application Listen (http://localhost:3000/)
app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000')
})