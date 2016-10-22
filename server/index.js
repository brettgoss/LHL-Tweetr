"use strict";

// const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(dbInstance));
});

app.listen(app.get('port'), () => {
  console.log("Example app listening on port " + app.get('port'));
});
