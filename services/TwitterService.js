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
        track: 'credito, seguro',
        location: '-117.12776,14.5388286402,-86.811982388,32.72083'
    });

    Twitter.on('connection success', function (uri) {
        console.log('connection success', uri);
    });

    Twitter.on('connection error network', function (error) {
        console.log('connection error network', error);
    });

    Twitter.on('data', function (obj) {
        var data = JSON.parse(obj).text
        Axios.post("http://localhost:8080/tweets", 
        querystring.stringify({ text: data })).then(function (response) {
            console.log(response.data);
            if (response.data.isTweet) {
                let newTweet = {
                    // Change response.data.lat && response.data.lng
                    lat: response.data.lat || null,
                    lng: response.data.lng || null,
                    userName: response.data.user.screen_name || null,
                    text: response.data.text || null
                };
                TweetsController.create(newTweet);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });

    // Twitter.pipe(fs.createWriteStream('tweets.json'));
};