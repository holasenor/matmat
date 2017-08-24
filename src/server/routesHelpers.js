import axios from 'axios';
import {validatePassword, validatePseudo, validateBio, validateTags, validateLike, validateGender, validateTarget, validateEmail    } from './controllers/aux/auth_helper';
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var nodemailer = require('nodemailer');
import Database from './database';
import User from './models/user';
var bcrypt = require('bcrypt');
const saltRounds = 6;
var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;

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
        expiresIn: '11h'
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
                expiresIn: '12h'
            }, function (err, token) {
                if (err) {
                    console.log(err);
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
            .then(() => {
                res.send({
                    success:true
                })
            })
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

export function updateUser (req, res, next) {
    var data = req.body;
    data.id =req.decode.id;
    console.log('going to update with database');
    validateTarget(req.body)
    .then(validateLike)
    .then(validateBio)
    .then(validateGender)
    .then((infos) => {
        if (req.decode.pseudo == infos.pseudo) {
            return infos;
        }
        else {
            return validatePseudo(infos);
        }
        return infos;
    })
    .then((infos) => {
        if (req.decode.email == infos.email) {
            return infos;
        }
        else {
            return validateEmail(infos);
        }
    })
    .then((infos) => {
        Database.updateUserData(data.id, infos).then((response) => {

            var user = {
                pseudo: infos.pseudo,
                email: infos.email,
                id: data.id
            }
            var token = tokenForUser(user);
            res.send({
                success: true,
                data: infos,
                token: token
            });
        })
    })
}

export function hashIfPasswordChange (req, res, next) {
    var password = req.body.password;
    if (password && password != "") {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                req.body.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
}

export function getInfo (req, res, next) {
    var id = req.decode.id;
    User.findById(id)
    .then((user) => {
        delete user['password'];
        res.send({
            success: true,
            user: user
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

export function deleteAccount (req, res, next) {
    User.delete(req.decode.id).
    then((ret) => {
        if (ret.result.n == 1 && ret.result.ok == 1) {
            res.send({
                success: true
            })
        }
        else {
            res.send({
                success: false
            });
        }
    })
}

export function deleteLikes (req, res, next) {
    next();
}


export function deleteMatches (req, res, next) {
    next();
}

export function deletePictures (req, res, next) {
    next();
}

export function checkFileSize (err, req, res, next) {
    if (err) {
        console.log(err);
        console.log('file is too big? maybe, but maybe it something else');
        res.send({
            success: false,
            message: "file is too big"
        });
    }
    else {
        next();
    }
}

export function addPictureToUser(req, res, next) {
    var userId = req.decode.id;
    var picturePath = req.file.originalname;
    User.addPicture(userId, picturePath)
    .then((result) => {
        if (result) {
            fs.unlink("static/images/uploads/" + result);
        }
        res.send({
            success: true,
            file: req.file,
            body: req.body
        });
    });
}

export function getMyPeople(req, res, next) {
    var myInfo = JSON.parse(req.query.myInfo);
    return User.getMyPeople(myInfo)
    .then((myPeople) => {
        res.send(myPeople);
    })
}

export function addLike(req, res, next) {
    var userId = req.decode.id;
    var likedId = req.body.id;
    User.addLike(userId, likedId)
    .then((result) => {
        if (result) {
            res.send({
                success: true,
                message: result.message
            });
        }
    });
}

export function addVisit(req, res, next) {
    console.log('im in addVisit');
    console.log(req.body);
    // var userId = req.decode.id;
    User.addOneVisit(req.body.userId, req.body.visitorId)
    .then((ret) => {
        if (ret) {
            res.send({
                success: true
            })
        }
        else {
            res.send({
                success: false
            });
        }
    })
}
