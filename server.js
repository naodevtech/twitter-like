const express = require('express')
var exphbs  = require('express-handlebars');

const app = express()

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('home', {
        name: "Sylvie"
    })
})

app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000')
})