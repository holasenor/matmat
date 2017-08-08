(function($){
	var socket = io.connect('http://localhost:3000');


	$('#loginform').submit(function(event){
		event.preventDefault();
		//on emet un evenemtn cote cient pour le servuer
		socket.emit('login', {
			username  : $('#login').val(),
			mail	  : $('#mail').val()
			})
	});
		// on recoit un event cote client provenant du serveur
		socket.on('newuser', function(user) {
			// alert('new user');//test alert OK
			$('#users').append('<h3>' + user.id + '</h3>');
			$('#users').append('<img style="height:2em;"src="' + 'https://cdn.intra.42.fr/users/medium_default.png' + '"/>');
		})

})(jQuery);
