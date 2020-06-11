const connection = require('../config/connectionDb.js')

class Tweet{
    constructor(props){
        this.content = props.content
        this.created_at = props.created_at
    }

    static create(id_user, content,  callback){
        const sql = `INSERT INTO messages SET id_user = '${id_user}', content = '${content}', created_at = '${new Date()}'`
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("erreur dans l'envoi du tweet ❌ : " + err)
            } else {
                console.log("Tweet envoyé dans la database ! ✅")
            }

        })
    }

    static getAllTweets(user, callback){
        const sql = `SELECT * FROM messages LEFT JOIN user ON messages.id_user = user.id_user ORDER BY created_at DESC LIMIT 20`
        connection.query(sql, function (err, result) {
            if (err) console.log('getAllTweet ❌: ' + err)
            // console.log(result[0])
            callback(result)
            console.log("Voici tous les tweets trouvés dans la database  ▶️ : ", result)
        })
    }
}

module.exports = Tweet