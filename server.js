const credentials = require('./creds');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

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
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function(err, result) {
    if (err) {
      return console.log(err);
    }

    res.render('index.ejs', {quotes: result});
  });
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

app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate(
    {
      name: 'Hands Like Houses' // filter collection by name
    },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: {_id: -1}, // MongoDB searches starting from newest entry
      upsert: true // creates new entry if nothing is found
    },
    (err, result) => { // after MongoDB replaces the quote, send results back to fetch request
      if (err) {
        return res.send(err);
      }
      res.send(result);
    }
  );
});
