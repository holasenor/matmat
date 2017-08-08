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

	var io = require('socket.io').listen(server);
	var me = false;//variable des messages pour stocker l'user du chat
	var users = {};
	var allmessages = [];
	var history = 9;//on limite a 9 messages pour ne pas tout peter
	var msg;
	var d;

	io.sockets.on('connection', function(socket){
		// console.log('new user');//test
//on parcours tous les utilisateurs
	for(var k in users) {
		socket.emit('newusr', users[k]);
	}
	for(var k in allmessages) {
		socket.emit('newmsg', allmessages[k]);
	}

// =========== je me connecte ============
//on ecoute l'evenement envoy2 du Chat
	socket.on('login', function(user){
		// console.log(user);
		me = user;
		me.login = user.pseudo;
		me.id = user.mail;
		// me.txt = user.txt;
		socket.emit('logged');//pour supprimer le mail la 1ere fois
		users[me.id] = me;
//on emit un evenement cote seveur pour que le client recoive
		// socket.emit('newuser');//socket actuel
		// socket.broadcast.emit('newuser');//alert tous les autre user sauf soi
		io.sockets.emit('newuser', me);//alert tous lesuser
	})


// ============= reception de messages =============
	socket.on('newmsg', function(message) {
		console.log(message);
		msg = message;
		allmessages.push(message);//on stcoke dans un tableau les messages
		if (allmessages.length > history) {
			allmessages.shift();//supprime le message le plus anciens du tableau
		}
		msg.message = message.message;
		msg.login = message.login;
		io.sockets.emit('newmsg', msg);
	})

// ============= je quitte le chat =============
	socket.on('disconnect', function() {
		if (!me) {
			return false; //pour eviter qund un utilsateur n'est pas connecté
		}
		delete users[me.id];
		io.sockets.emit('discusr', me);
	})

	})


    });
