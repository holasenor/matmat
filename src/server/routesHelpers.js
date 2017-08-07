import axios from 'axios';
import {validatePassword} from './controllers/aux/auth_helper';
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var nodemailer = require('nodemailer');
import Database from './database';
import User from './models/user';
var bcrypt = require('bcrypt');
const saltRounds = 6;


const mailOptions = {
    from: 'youremail@gmail.com',
    subject: 'You asked us to change your password',
};

export function sanitizeMongo(v) {
    if (v instanceof Object) {
        for (var key in v) {
            if (/^\$/.test(key)) {
                delete v[key];
            }
        }
    }
    return v;
};

export function tokenForUser(user) {
    var token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: 4000
    });
    return token;
}

export function isPasswordValid(req, res, next) {
    const password = req.body.password;
    validatePassword(req.body)
    .then(() => {
        next();
    })
    .catch((err) => {
        console.log(err);
    })
}

export function mailExists(req, res, next) {
    const mail = req.body.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(mail)) {
        Database.mailExists(mail)
        .then((exists) => {
            req.exists = exists;
            next();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else {
        console.log('This is not a valid mail ' + mail);
    }
}

export function createResetPasswordToken (req, res, next) {
    const {email, password} = req.body;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            var pass = {
                email: email,
                hash: hash
            };
            jwt.sign(pass, process.env.SECRET_KEY, {
                expiresIn: 6000
            }, function (err, token) {
                if (err) {
                    res.send({
                        success: false,
                        message: 'Something went wrong when creating you token'
                    });
                }
                else {
                    req.token = token;
                    next();
                }
            });
        });
    });
}

export function sendMail (req, res, next) {
    const {email, password} = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wedonthaveallnight@gmail.com',
            pass: 'Ij7pycEa'
        }
    });

    mailOptions.to = email;
    mailOptions.text = 'You really want to change it, then click here http://localhost:3000/reset/' + req.token;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send({
                success: false,
                message: error
            });
        } else {
            console.log('Email sent: ' + info.response);
            User.addResetPasswordToken(email, req.token)
            .catch((err)=> {
                console.log(err);
            });
        }
    });
}

export function toggleLike (req, res, next) {
    // var token = localStorage.
    // Database.
}
