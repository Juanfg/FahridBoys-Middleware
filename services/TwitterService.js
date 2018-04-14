const Axios = require('axios');
const querystring = require('querystring');
var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

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
        }).catch(function (error) {
            console.log(error);
        });
    });

    Twitter.pipe(fs.createWriteStream('tweets.json'));
};