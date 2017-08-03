import User from '../models/user.js';
import database from '../database';
var bcrypt = require('bcrypt');
const saltRounds = 6;
import {tokenForUser} from '../routesHelpers.js';
var jwt = require('jsonwebtoken');
import * as tools from '../../helpers/loginHelpers.js';

exports.signup = function (req, res, next) {
    // tools.validateEmail(req.body)
    // .then(() => {
        database.get().then((db) => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    req.body.password = hash;
                    db.collection('users')
                    .insertOne(req.body)
                    .then((a) => {
                        console.log('$$$$$$$');
                        console.log(a.result);
                        console.log('$$$$$$$');
                        var user = {
                            pseudo: req.body.pseudo,
                            email: req.body.email
                        }
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
