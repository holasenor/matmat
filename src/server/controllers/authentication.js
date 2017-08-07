import User from '../models/user.js';
import database from '../database';
var bcrypt = require('bcrypt');
const saltRounds = 6;
import {tokenForUser} from '../routesHelpers.js';
var jwt = require('jsonwebtoken');
import * as Validator from './aux/auth_helper.js';

exports.signup = function (req, res, next) {
    Validator.validateTarget(req.body)
    .then(Validator.validateEmail)
    .then(Validator.validatePseudo)
    .then(Validator.validatePassword)
    .then(Validator.validateGender)
    .then(Validator.validateLike)
    .then(Validator.validateBio)
    .then(Validator.validateTown)
    .then(Validator.validateAge)
    .then(Validator.validateTags)
    .then((data) => {
        User.create(data)
        .then((user) => {
            return tokenForUser(user);
        })
        .then((token) => {
            res.send({
                success: true,
                token: token
            });
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.signin = function (req, res, next) {
    res.send({
        success: true,
        token: tokenForUser(req.user)
    });
}

exports.checktoken = function (req, res, next) {
    var token = req.body.token;
    var mail = req.body.mail;
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
        if (token) {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    message: "Invalide Token"
                });
            }
            else {
                console.log(decode);
                res.send({
                    success: true
                });

            }
        }
        else {
            res.send({
                success: false,
                message: 'You don\'t have a token'
            });
        }
    });
}

exports.checklogin = function (req, res, next) {
    User.findByMail(req.body.email)
    .then((user) => {
        User.comparePassword(req.body.password,user.password)
        .then((passwordMatch) => {
            if (passwordMatch) {
                console.log(user);
                req.user = {
                    pseudo: user.pseudo,
                    email: req.body.email
                }
                next();
            }
            else {
                res.send({
                    success: false,
                    message: 'Your password does not match, try again'
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.checkMail = function (req, res, next) {
    return User.findByMail(req.body.email)
    .then((user) => {
        if (user) {
            req.user = user;
            next();
        }
        else {
            res.send({
                success: false,
                message: 'You don\'t have an account with this mail'
            });
        }
    })
}

exports.changePassword = function (req, res, next) {
    const resetPasswordToken = req.params.token;
    jwt.verify(resetPasswordToken, process.env.SECRET_KEY, function(err, decode){
        if (err) {
            res.send('This is not for you son, get the hell of here');
        }
        else {
            User.changePassword(resetPasswordToken, decode.hash)
            res.send('<h1>Your password has been changed, click <a href="http://localhost:3000">here</a></h1>')
        }
    });
}
