const Promise = require('bluebird');
var bcrypt = require('bcrypt');
Promise.promisifyAll(bcrypt);
var Database = require('../database');
const saltRounds = 6;

var User = function (data) {
    this.data = data;
}

User.prototype.data = {}

User.prototype.changeName = function (name) {
    this.data.name = name;
}

User.findById = function (id) {
    db.get('users', {id: id})
}

User.create = function (data) {
    return Database.get().then((db) => {
        return new Promise(function(resolve,reject){
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(data.password, salt, function(err, hash) {
                    data.password = hash;
                    db.collection('users')
                    .insertOne(data)
                    .then((a) => {
                        var user = {
                            pseudo: data.pseudo,
                            email: data.email
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

User.changePassword = function (pseudo, password) {
    return Database
    .getUser({pseudo: pseudo})
    .then((user) => {
        console.log(user);
    })
}

module.exports = User;
