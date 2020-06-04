const connection = require('../config/connectionDb.js')
const bcrypt = require("bcrypt");

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
        console.log('user.tel :' +  user.tel);
        const sql = `INSERT INTO users(lastname, firstname, birthdate, gender, city, email, password, username, tel, avatar) VALUES('${user.familyName}', '${user.name}', '${user.birthdate}', '${user.gender}', '${user.city}', '${user.email}', '${hashPwd}', '${user.username}', ${user.tel},  'Hello')`
        connection.query(sql, function (err, result) {
        if (err) {
            console.log('erreur create user : ' + err)
        } else {
            console.log("Inscription de l'utilisateur réussie! ✅")
        }

        })
    }
    
    // Recherche d'un utilisateur par email
    static getIdentifiantParams (identifiant, callback) {
        var sql = `SELECT * FROM users WHERE (email = '${identifiant}') OR (username ='${identifiant}') OR (tel = '${identifiant}')`
        connection.query(sql, function(err, result) {
            if (err) console.log('getIdentifiantParams : ' + err) ;
            const user = result[0];
            console.log("getIdentifiantParams trouvé via le mail : ", user)
            callback(null, user)
        })
    }

    static findById(id, done) {
        const query = `SELECT * FROM users WHERE id = '${id}';`;

        connection.query(query, (error, data) => {
            if (error) {
            console.error(`Erreur : ${error}`);
            return done(error, null);
            }

            const user = data[0];
            console.log(`Utilisateur : ${user}`);
            return done(null, user);
        });
    }

    static async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
    
    static async validPassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }
}
module.exports = User;