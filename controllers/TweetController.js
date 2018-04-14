const Sequelize = require('sequelize');

module.exports = function(app) {
    var Tweet = app.models.schema.tweet;

    var TweetsController = {
        index: function(req, res) {
            Tweet.findAll({})
            .then(function(tweets) {
                res.send(tweets);
            })
            .catch(err => {
                res.send(err);
            });
        },
    }

    return TweetsController;
};