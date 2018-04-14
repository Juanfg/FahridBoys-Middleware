const Sequelize = require('sequelize');
const winston = require('winston');

module.exports = function(app) {
    let Tweet = app.models.schema.tweet;

    let TweetsController = {
        index: function(req, res) {
            Tweet.findAll({})
            .then(function(tweets) {
                winston.log('Success at getting all the tweets in the DB');
                res.send(tweets);
            })
            .catch(err => {
                winston.error(err);
                res.send(err);
            });
        },

        create: function(req, res) {
            Tweet.create({
                lat: req.lat || null,
                lng: req.lng || null,
                userName: req.userName || null,
                text: req.text || null
            })
            .then(newTweet => {
                winston.log('Created a new user');
                res.send(newTweet);
            })
            .catch(err => {
                winston.error(err);
                res.send(err);
            });
        },

        create: function(tweet) {
            Tweet.create({
                lat: tweet.lat || null,
                lng: tweet.lng || null,
                userName: tweet.userName || null,
                text: tweet.text || null
            })
            .then(newTweet => {
                winston.log('Created a new user');
            })
            .catch(err => {
                winswton.error(err);
            });
        }
    }

    return TweetsController;
};