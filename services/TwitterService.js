const Axios = require('axios');
const querystring = require('querystring');
const TwitterStream = require('twitter-stream-api');
const fs = require('fs');
const TweetsController = require('../controllers/TweetController')

module.exports = function () {
    var keys = {
        consumer_key: "Pz6bjuLTg3iQnjQzPcIXhc3mP",
        consumer_secret: "tq0Q3xkXW6LAnT6Cyl844vIZCqV9UGLzeE6Q3Kh0YIQNrNzYcO",
        token: "407434963-23yr7ndQEbaRoWtrOheQCnGL9lxhTpXiLRRPSVRo",
        token_secret: "6z8KxaN0z4OoHOxtLbgx41GWvnh26nSbipeF0pLI0pQ3A"
    };

    console.log("something");

    var Twitter = new TwitterStream(keys, false);
    Twitter.stream('statuses/filter', {
        locations: '-117.12776,14.5388286402,-86.811982388,32.72083'
    });

    Twitter.on('connection success', function (uri) {
        console.log('connection success', uri);
    });

    Twitter.on('connection error network', function (error) {
        console.log('connection error network', error);
    });

    Twitter.on('data', function (obj) {
        var tweet = JSON.parse(obj);
        console.log(tweet.hasOwnProperty('retweet_status'));
        if (tweet.hasOwnProperty('retweet_status')) {
        } else {
            if (tweet.coordinates) {
                Axios.post("http://10.50.82.149:8080/tweets", querystring.stringify({
                    text: tweet.text,
                    lat: tweet.coordinates.coordinates[1],
                    lon: tweet.coordinates.coordinates[0]
                })).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                var lon = (tweet.place.bounding_box.coordinates[0][0][0] + tweet.place.bounding_box.coordinates[0][2][0])/2;
                var lat = (tweet.place.bounding_box.coordinates[0][0][1] + tweet.place.bounding_box.coordinates[0][2][1])/2;
                Axios.post("http://10.50.82.149:8080/tweets", querystring.stringify({
                    text: tweet.text,
                    lat: lat,
                    lon: lon
                })).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    });

    // Twitter.pipe(fs.createWriteStream('tweets.json'));
};