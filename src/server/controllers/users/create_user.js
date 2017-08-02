import User from '../../models/user.js';
import database from '../../database';
var bcrypt = require('bcrypt');

const saltRounds = 6;
module.exports = (req, res, next) => {
    database.get().then((db) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                req.body.password = hash;
                db.collection('users')
                .insertOne(req.body)
                .catch((err) => {
                    console.log(err);
                });
                res.send('created');
            });
        });

    })
};
