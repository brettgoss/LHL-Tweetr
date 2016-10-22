"use strict";
const dotenv = require('dotenv').config();

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = 'mongodb://heroku_hjg8w70f:ugvgpknibj9s77to6hfbnscpq0@ds063546.mlab.com:63546/heroku_hjg8w70f';

let collections;

MongoClient.connect(MONGODB_URI, (err, db) => {
  collections = db.collection("tweets");
});

const dbMethods = {

  saveTweet: (data) => {
    collections.insert(data);
    return true;
  },

  getTweets: (callback) => {
    collections.find().toArray((err, results) => {
      if (err) {
        console.log(err);
      }
      callback(results.sort(function(a, b) {
        return a.created_at - b.created_at
      }));
    });
  }
};

module.exports = {
  connect: (onConnect) => {
    onConnect(dbMethods);
  }
}
