import {tokenForUser} from './routesHelpers.js';
var auth = require('./controllers/authentication');

module.exports = function (app) {

    // app.post('/user',
    // function(req, res, next) {
    //     next();
    // },
    // require('./controllers/users/create_user'));

    app.get('/user',
    auth.checktoken,
    require('./controllers/users/get_user'));

    app.post('/signup',
    auth.signup);

    app.post('/signin',
    auth.signin,
    (req, res) => {
        res.send({success: true});
    });

    app.post('/checktoken',
    auth.checktoken);

}
