const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var Promise = require("bluebird");
var mongodb = require('mongodb');
const router = require('./routes.js');
const initApp = require('./config/setup');
var url = "mongodb://localhost:27017/mydb";
Promise.promisifyAll(mongodb);

var app = new express();
app.connection = mongodb.MongoClient.connectAsync(url)
.then((db) => {
    console.log('Connected');
    return db;
})
.catch((err) => {
    console.log('error = ' + err);
});

initApp(app);

app.use(express.static('static'));
app.use(bodyParser.json({type: '*/*'})); // for later

router(app);

app.get('*', function (req, res) {
    let indexPage = fs.readFileSync(path.resolve('index.html'));
    let out = String(indexPage);
    console.log(out);
    res.send(out);
});

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
