module.exports = function (app) {

    app.get('/api/users/:name', function(req, res) {
        res.send('What is up ' + req.name + '!');
    });

    app.post('/api/users', function(req, res) {
        var user_id = req.body.id;
        var token = req.body.token;
        var geo = req.body.geo;

        res.send(user_id + ' ' + token + ' ' + geo);
    });

}
