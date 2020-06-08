const mysql = require('mysql')
require('dotenv').config()

//config DB mysql with dotenv
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    // socketPath: "/var/run/mysqld/mysqld.sock",
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
});

// Connction à la base de données
connection.connect(function(err) {
    if(err){
        console.log("Erreur lors de la connexion à la db ❌ : ", err)
    }
    console.log('Connecté à la database ✅')
});

module.exports = connection