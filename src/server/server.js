const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var Promise = require("bluebird");
const router = require('./routes.js');
var url = "mongodb://localhost:27017/mydb";
var database = require('./database');
var initApp = require('./config/setup');
var jwt = require('jsonwebtoken');
var mychat =require('./mychat');
var mynewchat =require('./mynewchat');
var io = require('socket.io');
// global.io = require('socket.io');

var app = new express();
// var secureRoutes = express.Router();

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/api', secureRoutes);
process.env.SECRET_KEY = 'ThisIsMySecretKey';

router(app);

app.get('*', function (req, res) {
	let indexPage = fs.readFileSync(path.resolve('index.html'));
	let out = String(indexPage);
	res.send(out);
});

app.post('*', function (req, res) {
	const {Body, From} = req.body;
	const message = {
		body: Body,
		from: From.slice(8),
	}
	io.emit('message', message)
	res.send(out);
});

database.connect(url, function () {
    initApp();

    const port = 3000;
    const server = http.createServer(app);

    server.listen(port, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server listening on port:', port);
			io = io.listen(server);
			// mychat(io);
			mynewchat(io);
        }
    });
});
