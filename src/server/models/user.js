const Promise = require('bluebird');
var bcrypt = require('bcrypt');
Promise.promisifyAll(bcrypt);
var Database = require('../database');
const saltRounds = 6;
var ObjectId = require('mongodb').ObjectID;
var geolib = require('geolib');

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

User.addPicture = function (id, path) {
    var pictureToDeleteLater;
    return Database.get().then((db) => {
        return db.collection('users')
        .findOne({_id: ObjectId(id)}).then((res) => {
            if (res.pictures && res.pictures[4]) {
                pictureToDeleteLater = res.pictures[0];
            }
            else {
                pictureToDeleteLater = false;
            }
            return db;
        })
    })
    .then((db) => {
        return db.collection('users')
        .updateOne({ _id: ObjectId(id), "pictures.4": { "$exists": 1 } },{ $pop: { pictures: -1 } } )
        .then((res) => {
            return db;
        });
    })
    .then((db) => {
        return db.collection('users')
        .update({ _id: ObjectId(id) },{ $push: { pictures: { $each:[ path ], $slice : 5} }})
        .then((res) => {
            return pictureToDeleteLater;
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

User.getMyPeople = function (myInfo) {
    return Database.get()
    .then((db) => {
        return db.collection('users').find({}).toArray();
    })
    .then((everyone) => {
        var myPeople = everyone.filter((someone) => {
            var lat = parseFloat(someone.lat);
            var mylat = parseFloat(myInfo.lat);
            var lng = parseFloat(someone.lng);
            var mylng = parseFloat(myInfo.lng);
            var distance = geolib.getDistance(
                {latitude: lat, longitude: lng},
                {latitude: mylat, longitude: mylng}
            );
            return (distance < 50000)
        })
        return myPeople;
    })
}

module.exports = User;
