const Sequelize = require('sequelize');
const winston = require('winston');

module.exports = function(app) {
    let Tweet = app.models.schema.tweet;

    let TweetController = {
        index: function(req, res) {
            Tweet.findAll({})
            .then(function(tweets) {
                winston.log('Success at getting all the tweets in the DB');
                res.status(200).json(tweets);
            })
            .catch(err => {
                winston.error(err);
                res.json(err);
            });
        },

        create: function(req, res) {
            Tweet.create({
                lat: req.body.lat || null,
                lng: req.body.lng || null,
                userName: req.body.userName || null,
                text: req.body.text || null,
                categoryId: req.body.categoryId || null
            })
            .then(newTweet => {
                winston.log('Created a new user');
                res.status(200).json(newTweet);
            })
            .catch(err => {
                winston.error(err);
                res.json(err);
            });
        },

        addFromService: function(tweet) {
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
        },

        indexFromCategory: function(req, res) {
            Tweet.findAll({ where: { categoryId: req.params.categoryId } })
                .then(tweets => {
                    res.status(200).json(tweets);
                })
                .catch(err => {
                    res.json(err);
                })
        }
    }

    return TweetController;
};