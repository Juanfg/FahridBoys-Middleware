const winston = require('winston');

module.exports = function(app) {
    let TweetSchema = app.models.tweet;

    let TweetController = {
        index: function(req, res, next) {
            console.log('hoa');
            TweetSchema.find({}, function (err, tweets) {
                if (err) {
                    console.log('jfklds');
                    return winston.error(err);
                }
                console.log('jfklds');

                res.send(tweets);
            });
        }    
    };

    return TweetController;
};