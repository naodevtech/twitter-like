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
    }

    static create(user){
        var sql = `INSERT INTO users(lastname, firstname, birthdate, gender, city, email, password, username, tel, avatar) VALUES('${user.familyName}', '${user.name}', '${user.birthdate}', '${user.gender}', '${user.city}', '${user.email}', '${user.password}', '${user.username}', ${user.tel},  'Hello')`
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("User Insert Success!");
        });
    }

    // static getByEmail(user){
    //     // select 
    //     const sql = ``
    // }
}
module.exports = User