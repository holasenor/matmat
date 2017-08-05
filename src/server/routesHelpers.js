import axios from 'axios';
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var nodemailer = require('nodemailer');

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

export function createResetPasswordToken (req, res, next) {
    const {email, password} = req.body;

    var pass = {
        email: email
    };
    jwt.sign(pass, process.env.SECRET_KEY, {
        expiresIn: 6000
    }, function (err, token) {
        req.token = token;
        next();
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
            next();
        }
    });
}
