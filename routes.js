module.exports = function(app) {
    let tweetsCtrl = app.controllers.TweetsController;

    app.get('/api/tweets', tweetsCtrl.index);

    app.get('*', function(req, res) {
        res.json({ message: 'FahridBoys Middleware' });
    });
};