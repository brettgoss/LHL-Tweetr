"use strict";
const dotenv = require('dotenv').config();

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

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
