const Tweet = require('../models/Tweet.js');

exports.createTweet = (req,res) => { 
    user = req.user
    console.log(req.body.tweet.length)
    if(req.body.tweet != ''){
        Tweet.create(user.id_user, req.body.tweet)
        res.redirect(`/dashboard/${user.username}`)
    } else if(req.body.tweet.length > 140){
        console.log('Le champs pour poster un tweet contient plus de 140 caractères ! ❌')
        res.redirect(`/dashboard/${user.username}`)
    }
    else{
        console.log('Le champs pour poster un tweet est vide! ❌')
        res.redirect(`/dashboard/${user.username}`)
    }
}

