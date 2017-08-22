import {sendMail, createResetPasswordToken, isPasswordValid, mailExists, updateUser, hashIfPasswordChange, getInfo, deleteAccount, deleteMatches, deleteLikes, checkFileSize, checkFileExtension, deleteLastOneIfAny, uploadPicture, addPictureToUser, deletePictures, addLikeInUserLiked, addLikeInMe} from './routesHelpers.js';
var auth = require('./controllers/authentication');
var jwt = require('jsonwebtoken');
import Database from './database';
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/images/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage, limits: { fileSize: 500000 }, fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.jpg' && path.extname(file.originalname) !== '.png') {
        return cb(new Error('Not a jpg or png file'));
    }
    cb(null, true)
}})


module.exports = function (app) {

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

    app.post('/togglelike',
    auth.checktoken,
    addLikeInUserLiked,
    addLikeInMe,
    (req,res) => {
        if (req.like == 'done') {
            res.send({
                success: true
            });
        }
        else {
            res.send({
                success: false,
                message: req.like
            });
        }
    });

    app.post('/deleteaccount',
    auth.checktoken,
    deleteMatches,
    deleteLikes,
    deletePictures,
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

    app.post('/upload',
    upload.single('photo'),
    auth.checktoken,
    checkFileSize,
    addPictureToUser);

}
