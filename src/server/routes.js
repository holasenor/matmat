module.exports = function (app) {

    app.get('/user/:id', function(req, res, next) {
        app.connection.then((db) => {
            db.createCollection('asdasdfadsadsadsadsa');
            console.log('heeeere');
        })
        // res.send('asdfff');
        next();
    }, function (req, res) {
        console.log('hola 2');
        res.send('<div style="font-size:25px">AAKJSHDLKASD</div>');
    });


}
