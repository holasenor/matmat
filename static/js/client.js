(function($){
	var socket = io.connect('http://localhost:3000');
	var lastmsg = false;
	// var ent = require("ent");


	$('#loginform').submit(function(event){
		event.preventDefault();
		//on emet un evenemtn cote cient pour le servuer
		socket.emit('login', {
			pseudo	  : $('#login').val(),
			room	  : $('#room').val(),
			// txt	  	  : $('#txt').val()
			})

	});

		socket.on('logged', function(room) {
			$('#loginform').fadeOut();
			$('#form').fadeIn();
			$('#messages').fadeIn();
			myroom : $('#myroom').val(room);
			$('#message').focus();//on refocus sur ce chammp
		})

//================ envoie de messages =============
	$('#form').submit(function(event) {
		event.preventDefault();// couper l;evenement

	socket.emit('newmsg', {
			pseudo	  : $('#login').val(),
			message	  : $('#message').val(),
			room	  : $('#myroom').val(),
		})
		$('#message').val('');//on supprime le message precedent
		$('#message').focus();//on refocus sur ce chammp
	});

//on affiche les messages
	socket.on('newmsg', function(msg) {
		// console.log(msg.room);// $('#users').append('<img style="height:2em;" src="' + 'https://cdn.intra.42.fr/users/medium_default.png' + '"/>');// recuperer la photo
		if (msg.room == $('#myroom').val()) {
			$('#messages').append('<h3>' + msg.pseudo + ' </h3>')//recuperer le pseudo de l'user
			$('#messages').append('<div  style="word-wrap: break-word;">' + msg.message + '</div>')
			$('#allMessages').animate({scrollTop: $('#allMessages').prop("scrollHeight")}, 500);
			$('#myChat').animate({scrollTop : $('#myChat').prop('scrollHeight') }, 1000);//scroll auo en bas des messages
		}
	});


//================ gestion des connectee =============

	// on recoit un event cote client provenant du serveur
	socket.on('newusr', function(user) {
		// alert('new user');//test alert OK
		// $('#users').append('<h3>' + user.id + '</h3>');
		$('#users').append('<h4>' + user.login + '</h4>');
		// $('#users').append('<span>' + user.txt + '</span>');
		$('#users').append('<img style="height:2em;" id="' + user.id + '"  src="' + 'https://cdn.intra.42.fr/users/medium_default.png' + '"/>');
	})

	//si un user est deconnecte, on l'enleve
	socket.on('discusr',function(user) {
		$('#' + user.id).remove();
	})

})(jQuery);
