const credentials = require('./creds');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect(`mongodb://${credentials.username}:${credentials.password}@ds135700.mlab.com:35700/crud-example`, (err, database) => {
  if (err) {
    return console.log(err);
  }

  db = database;

  app.listen(3000, function(req, res) {
    console.log('Listening on port 3000');
  });
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('saved to database');
    res.redirect('/');
  });
});
