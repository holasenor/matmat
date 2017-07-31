const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var Promise = require("bluebird");
// var mongodb = require('mongodb');
const router = require('./routes.js');
var url = "mongodb://localhost:27017/mydb";
// Promise.promisifyAll(mongodb);
var database = require('./database');
var initApp = require('./config/setup');

var app = new express();

app.use(express.static('static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

router(app);

app.get('*', function (req, res) {
    let indexPage = fs.readFileSync(path.resolve('index.html'));
    let out = String(indexPage);
    console.log(out);
    res.send(out);
});

database.connect(url, function () {
    initApp();

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
});
