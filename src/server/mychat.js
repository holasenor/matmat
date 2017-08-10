
module.exports = function (io) {

	var me = false;//variable des messages pour stocker l'user du chat
	var users = {};
	var allmessages = [];
	var history = 99;//on limite a 9 messages pour ne pas tout peter
	var msg;
	var d;
	var ent = require("ent"); //sontre les failles xss : https://edutechwiki.unige.ch/fr/Socket.io


	io.sockets.on('connection', function(socket){
		// console.log('new user');//test
		//on parcours tous les utilisateurs
		for(var k in users) {
			socket.emit('newusr', users[k]);
		}
		for(var k in allmessages) {
			socket.to(allmessages[k].room).emit('newmsg', allmessages[k]);
			console.log(allmessages[k]);
		}

		// =========== je me connecte ============
		//on ecoute l'evenement envoy2 du Chat
		socket.on('login', function(user){
			// console.log(user);
			me = user;
			me.login = user.pseudo;
			me.id = user.room;
			// me.txt = user.txt;
			socket.join(user.room);
			socket.emit('logged', user.room);//pour supprimer le mail la 1ere fois
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
			msg.room = message.room;
			allmessages.push(message);//on stcoke dans un tableau les messages
			if (allmessages.length > history) {
				allmessages.shift();//supprime le message le plus anciens du tableau
			}
			msg.message = ent.encode(message.message);//pour enpecher les failles XSS
			// msg.message = message.message;// dans portection de la faille xss
			msg.login = message.login;
			io.sockets.to(msg.room).emit('newmsg', msg);
			// io.sockets.to('toto').emit('newmsg', msg);
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

}
