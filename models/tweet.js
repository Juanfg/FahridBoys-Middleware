const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(app) {

    let TweetSchema = new Schema({
        lat: String,
        lon: String,
        user: String,
        text: String
    });

    return mongoose.model('Tweet', TweetSchema);
}