import {sendMail, createResetPasswordToken, isPasswordValid, mailExists, updateUser, hashIfPasswordChange, getInfo, deleteAccount, deleteMatches, deleteLikes} from './routesHelpers.js';
var auth = require('./controllers/authentication');
var jwt = require('jsonwebtoken');
import Database from './database';

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
    auth.signin);

    app.post('/checktoken',
    auth.checktoken,
    (req, res, next) => {
        if (req.check) {
            next();
        }
        else {
            res.send({
                success: false,
                message: 'something wrong with it\'s token'
            });
        }
    },
    getInfo);

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

    app.post('/togglelike')

    app.post('/deleteaccount',
    auth.checktoken,
    deleteMatches,
    deleteLikes,
    deleteAccount);

    app.post('/updateuser',
    auth.checktoken,
    (req, res, next) => {
        if (req.check) {
            next();
        }
        else {
            res.send({
                success:false,
                message: 'Something wrong, sorry'
            });
        }
    },
    (req, res, next) => {
        if (req.body.password && req.body.password != "") {
            isPasswordValid(req, res, next);
        }
        else {
            next();
        }
    },
    hashIfPasswordChange,
    updateUser);

    app.get('/myinfo/:token',
    auth.checktoken,
    getInfo);

}
