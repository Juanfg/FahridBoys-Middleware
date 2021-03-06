const express = require('express');
const load = require('express-load');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');

const port = process.env.PORT || 8081;
const app = express();

const tService = require("./services/TwitterService.js");

app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

load('models/schema.js')
    .then('controllers')
    .then('routes.js')
    .into(app);

var sequelize = app.models.schema.sequelize;

sequelize.sync().done(function () {
    app.listen(port, function () {
        console.log("Listening on port %s", port);
    })
});

var tServiceInstance = new tService(app);

module.exports = app;