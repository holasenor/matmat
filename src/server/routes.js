
module.exports = function (app) {

    app.post('/user/',
    function(req, res, next) {
        next();
    },
    require('./controllers/users/create_user')
);

app.get('/user/',
function(req, res, next) {
    next();
},
require('./controllers/users/get_user')
);

}
