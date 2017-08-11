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
		if (lastmsg == false)
			lastmsg = msg.pseudo;
		if (msg.room == $('#myroom').val()) {
			if(lastmsg != msg.pseudo) {
				// $('.messages').append('<div class="sep">___________ </div>')//recuperer le pseudo de l'user
				$('.messages').append('<div class="right">' + msg.pseudo + ' </div>')//recuperer le pseudo de l'user
				$('.messages').append('<div><h4  class="aMessageBlue" style="word-wrap: break-word;">' + msg.message + '</h4></div>')
			}
			else {
				$('.messages').append('<div class="left">' + msg.pseudo + ' </div>')//recuperer le pseudo de l'user
				$('.messages').append('<div><h4  class="aMessagePink" style="word-wrap: break-word;">' + msg.message + '</h4></div>')
							}
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
