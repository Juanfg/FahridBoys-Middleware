module.exports = function(app) {
    let tweetCtrl = app.controllers.TweetController;

    app.get('/api/tweets', tweetCtrl.index);

    app.get('*', function(req, res) {
        res.json({ message: 'FahridBoys Misddleware' });
    });
};