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
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
});

connection.connect(function(err) {
    if (err) throw err;
    const sql = "CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, lastname TEXT, firstname TEXT, birthdate DATE, gender TEXT, city TEXT, email TEXT, password TEXT, username TEXT, avatar TEXT)"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    console.log("Connected!");
});

module.exports = connection