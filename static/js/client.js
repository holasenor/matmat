(function($){
	var socket = io.connect('http://localhost:3000');
	var lastmsg = false;


	$('#loginform').submit(function(event){
		event.preventDefault();
		//on emet un evenemtn cote cient pour le servuer
		socket.emit('login', {
			pseudo	  : $('#login').val(),
			mail	  : $('#mail').val(),
			// txt	  	  : $('#txt').val()
			})
	});

		socket.on('logged', function() {
			$('#loginform').fadeOut();
		})

//================ envoie de messages =============
	$('#form').submit(function(event) {
		event.preventDefault();// couper l;evenement

	socket.emit('newmsg', {
			pseudo	  : $('#login').val(),
			message	  : $('#message').val(),
		})
		$('#message').val('');//on supprime le message precedent
		$('#message').focus();//on refocus sur ce chammp
	});

//on affiche les messages
	socket.on('newmsg', function(msg) {
		// $('#users').append('<img style="height:2em;" src="' + 'https://cdn.intra.42.fr/users/medium_default.png' + '"/>');// recuperer la photo
		$('#messages').append('<h3> Pseudo </h3>')//recuperer le pseudo de l'user
		$('#messages').append('<div  style="word-wrap: break-word;">' + msg.message + '</div>')
		$('#messages').animate({scrollTop : $('#messages').prop('scrollHeight' + '3em') }, 50);//scroll auo en bas des messages
	})


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
