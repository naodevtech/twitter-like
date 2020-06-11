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
    }

    // Création d'un utilisateur
    static create(user, hashPwd) {
        console.log('user.tel :' +  user.tel);
        const sql = `INSERT INTO user(firstname, lastname, birthdate, gender, city, email, tel, username, password, avatar) VALUES('${user.name}', '${user.familyName}', '${user.birthdate}', '${user.gender}', '${user.city}', '${user.email}', '${user.tel}', '${user.username}', '${hashPwd}',  '${user.avatar}')`
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('erreur create user ❌ : ' + err)
            } else {
                console.log("Inscription de l'utilisateur réussie! ✅")
            }

        })
    }
    
    // Recherche d'un utilisateur par email
    static getUsersByEmailOrUsername(user, cb){
        const sql = `SELECT * FROM user WHERE (email = '${user.email}') OR (username='${user.username || user.email}')`
        connection.query(sql, function (err, result) {
            if (err) console.log('getUsersByEmail ❌: ' + err)
            cb(result)
            console.log("Utilisateur trouvé via le mail ou le username ▶️ : ", result)
        })
    }

    static getIdentifiantParams (identifiant, callback) {
        var sql = `SELECT * FROM user WHERE (email = '${identifiant}') OR (username ='${identifiant}') OR (tel = '${identifiant}')`
        connection.query(sql, function(err, result) {
            if (err) console.log('getIdentifiantParams ❌: ' + err) ;
            const user = result[0];
            // console.log("getIdentifiantParams trouvé via le mail ✅ : ", user)
            callback(null, user)
        })
    }

    static findById(id, done) {
        const query = `SELECT * FROM user WHERE id = '${id}';`;
        connection.query(query, (error, data) => {
            if (error) {
            console.error(`findById ❌ : ${err}`);
            return done(err, null);
            }

            const user = data[0];
            console.log(`findById ▶️ : ${user}`);
            return done(null, user);
        });
    }

    static getAllusers(callback){
        const sql = `SELECT * FROM user`
        connection.query(sql, function (err, result) {
            if (err) console.log('getAllusers ❌: ' + err)
            // console.log(result[0])
            callback(result)
            // console.log("Voici tous les utilisateurs trouvés dans la database  ▶️ : ", result)
        })
    }

    static getUsersForSuggestions(callback){
        const sql = `SELECT * FROM user LIMIT 5`
        connection.query(sql, function (err, result) {
            if (err) console.log('getAllTweet ❌: ' + err)
            // console.log(result[0])
            callback(result)
            console.log("Voici tous les utilisateurs trouvés dans la database pour la suggestion ▶️ : ", result)
        })
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