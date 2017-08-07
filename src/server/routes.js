import {sendMail, createResetPasswordToken, isPasswordValid, mailExists} from './routesHelpers.js';
var auth = require('./controllers/authentication');
var jwt = require('jsonwebtoken');

module.exports = function (app) {

    // app.post('/user',
    // function(req, res, next) {
    //     next();
    // },
    // require('./controllers/users/create_user'));

    app.get('/user',
    // auth.checktoken,
    require('./controllers/users/get_user'),
    (req, res) => {
        if (req.exists) {
            res.send({
                success: true
            });
        }
        else {
            res.send({
                success: false,
            });
        }
    });

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
    auth.changePassword);

    app.post('/sendmail',
    mailExists,
    isPasswordValid,
    createResetPasswordToken,
    sendMail,
    (req, res) => {
        res.send({success: true});
    });

    app.post('/togglelike',
    )
}
