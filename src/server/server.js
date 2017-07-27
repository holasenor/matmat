const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
//
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err
//   console.log("Database created!");
//   db.close();
// })


var app = new express();
require('./config/setup.js')(MongoClient);
app.use(express.static('static'));
app.use(bodyParser.json({type: '*/*'}));

app.get('*', function (req, res) {
    let indexPage = fs.readFileSync(path.resolve('index.html'));
    let out = String(indexPage);
    console.log(out);
    res.send(out);
});

// router(app);

const port = 3000;
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log(`
      Error!
        message: ${err.message}
        type: ${err.type}
        description: ${err.description}
    `);
  } else {
    console.log('Server listening on port:', port);
  }
});
