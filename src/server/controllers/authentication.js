import User from '../models/user.js';
import database from '../database';
var bcrypt = require('bcrypt');
const saltRounds = 6;
import {tokenForUser} from '../routesHelpers.js';
var jwt = require('jsonwebtoken');
import * as tools from '../../helpers/loginHelpers.js';

exports.signup = function (req, res, next) {
    // tools.validateEmail(req.body)
    // .then(tools.validateEmail)
    // .then(tools.validatePseudo)
    // .then(tools.validatePassword)
    // .then(tools.validateGender)
    // .then(tools.validateLike)
    // .then(tools.validateBio)
    // .then(tools.validateTown)
    // .then(tools.validateAge)
    // .then(tools.validateTags)
    // .then(() => {
        database.get().then((db) => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    req.body.password = hash;
                    db.collection('users')
                    .insertOne(req.body)
                    .then((a) => {
                        var user = {
                            pseudo: req.body.pseudo,
                            email: req.body.email
                        }
                        console.log('user = ');
                        console.log(user);
                        res.send({
                            success: true,
                            token: tokenForUser(user)
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            });

        })
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
};

exports.signin = function (req, res, next) {
    var user = {
        pseudo: req.body.pseudo,
        email: req.body.email
    }
    console.log('user = ');
    console.log(user);
    res.send({
        success: true,
        token: tokenForUser(user)
    });
};

exports.checktoken = function (req, res, next) {
    var token = req.body.token;
    var mail = req.body.mail;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
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
        });
    }
    else {
        res.send('You don\'t have a token');
    }
}
