// Importation module npm
const express = require('express');
const exphbs  = require('express-handlebars');
const logger = require("morgan");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const initializePassport = require("./config/passport");

// Instanciation d'Express
const app = express()

initializePassport(passport);

// Configuration moteur de template Handlebars et express.static()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// Pour récuperer les requêtes liée au req.body
app.use(express.urlencoded({
    extended: false
}));

// MIDDLEWARES
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

// SESSION
app.use(
  session({
    secret: "sylvie naim my",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, // 24 hours
    },
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(require('./routes/authRoutes.js'))
app.use(require('./routes/homeRoute.js'))
app.use(require('./routes/dashboardRoute.js'))
app.use(require('./routes/error404.js'))


// Application Listen (http://localhost:3000/)
app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000 🚀')
})

