import {sendMail, createResetPasswordToken} from './routesHelpers.js';
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
    auth.checklogin,
    auth.signin,
    (req, res) => {
        res.send({success: true});
    });

    app.post('/checktoken',
    auth.checktoken);

    app.get('/reset/:token',
    function (req, res, next) {
        const resetPasswordToken = req.params.token;
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
            console.log(resetPasswordToken);
            res.send('asdf');
        });
        //////////// IM HEREEE change le MDP ET MAIL
        // auth.checkMail,
        // require('./controllers/users/update_user'));

        app.post('/sendmail',
        createResetPasswordToken,
        sendMail,
        (req, res) => {
            res.send({success: true});
        });

    });
}
