const connection = require('../config/connectionDb.js')

class User{
    constructor(props){
        this.name = props.name
        this.familyName = props.familyName
        this.birthdate = props.birthdate
        this.gender = props.gender
        this.username = props.username
        this.tel = props.tel
        this.city = props.city
        this.email = props.email
        this.password = props.password
        this.passwordCheck = props.passwordCheck
        this.results = []
    }

    // Création d'un utilisateur
    static create(user){
        var sql = `INSERT INTO users(lastname, firstname, birthdate, gender, city, email, password, username, tel, avatar) VALUES('${user.familyName}', '${user.name}', '${user.birthdate}', '${user.gender}', '${user.city}', '${user.email}', '${user.password}', '${user.username}', ${user.tel},  'Hello')`
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("User Insert Success!");
        });
    }
    
    // Recherche d'un utilisateur par email
    static getUsersByEmail(user, cb){
        var sql = `SELECT * FROM users WHERE (email = '${user.email}') OR (username='${user.username}')`
        connection.query(sql, function (err, result) {
            if (err) throw err
            cb(result)
            console.log("Utilisateur trouvé via le mail : ", result)
        })
    }
    
}
module.exports = User