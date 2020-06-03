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
    static create(user, hashPwd) {
        console.log('PWD hash :' +  hashPwd);
        const sql = `INSERT INTO users(lastname, firstname, birthdate, gender, city, email, password, username, tel, avatar) VALUES('${user.familyName}', '${user.name}', '${user.birthdate}', '${user.gender}', '${user.city}', '${user.email}', '${hashPwd}', '${user.username}', ${user.tel},  'Hello')`
        connection.query(sql, function (err, result) {
        if (err) console.log('create user : ' + err)
        console.log("Inscription de l'utilisateur réussie! ✅")
        })
    }
    
    // Recherche d'un utilisateur par email
    static getUsersByEmailOrUsername(user, cb){
        const sql = `SELECT * FROM users WHERE (email = '${user.email}') OR (username='${user.username || user.email}')`
        connection.query(sql, function (err, result) {
            if (err) console.log('getUsersByEmail : ' + err)
            cb(result)
            console.log("Utilisateur trouvé via le mail ou le username ▶️ : ", result)
        })
    }
}
module.exports = User