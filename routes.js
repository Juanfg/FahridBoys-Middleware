module.exports = function(app) {
    let tweetCtrl = app.controllers.TweetController;
    let categoryCtrl = app.controllers.CategoryController;

    // Tweets routes
    app.get('/api/tweets', tweetCtrl.index);
    app.post('/api/tweets', tweetCtrl.create);
    app.get('/api/tweets/category/:categoryId', tweetCtrl.indexFromCategory);

    // Categories routes
    app.get('/api/categories', categoryCtrl.index);
    app.post('/api/categories', categoryCtrl.create);
    app.get('/api/categories/:categoryId', categoryCtrl.view);
    app.put('/api/categories/:categoryId', categoryCtrl.update);
    app.delete('/api/categories/:categoryId', categoryCtrl.delete);

    app.get('*', function(req, res) {
        res.json({ message: 'FahridBoys Middleware' });
    });
};