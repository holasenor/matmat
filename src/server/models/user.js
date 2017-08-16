const Promise = require('bluebird');
var bcrypt = require('bcrypt');
Promise.promisifyAll(bcrypt);
var Database = require('../database');
const saltRounds = 6;
var ObjectId = require('mongodb').ObjectID;


var User = function (data) {
    this.data = data;
}

User.create = function (data) {
    return Database.get().then((db) => {
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(data.password, salt, function(err, hash) {
                    data.password = hash;
                    db.collection('users')
                    .insertOne(data)
                    .then((res) => {
                        console.log(res.insertedId);
                        var user = {
                            pseudo: data.pseudo,
                            email: data.email,
                            id: res.insertedId
                        }
                        resolve(user);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            });
        })
        .catch((err) => {
            console.log(err);
        })
    });
}

User.comparePassword = function (passwordToCompare, hash) {
    return bcrypt.compare(passwordToCompare, hash);
}

User.findByMail = function (email) {
    return Database.get().then((db) => {
        return db.collection('users').findOne({email: email});
    })
}

User.findById = function (id) {
    return Database.get().then((db) => {
        return db.collection('users').findOne({_id: ObjectId(id)});
    })
}

User.changePassword = function (token, hash) {
    return Database.get()
    .then((db) => {
        return db.collection('users')
        .updateOne({resetPasswordToken: token}, {$set:{password: hash}})
        .then((a) => {
            return db.collection('users')
            .update({resetPasswordToken: token}, { $unset : {resetPasswordToken: 1} })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

User.addResetPasswordToken = function (mail,token) {
    return Database.get()
    .then((db) => {
        return db.collection('users').updateOne({email: mail}, {$set:{resetPasswordToken: token}});
    })
    .catch((err) => {
        console.log(err);
    });
}

User.getEmail = function () {
    return new Promise(function (res, rej) {
        User.asdf = localStorage.getItem('username')
        res(localStorage.getItem('username'));
    });
}

User.toggleLike = function () {
    console.log('this user has mail ' + User.asdf);
}

User.delete = function (id) {
    return Database.get().then((db) => {
        return db.collection('users').deleteOne({_id: ObjectId(id)});
    })
}

module.exports = User;
