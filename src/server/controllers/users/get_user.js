import User from '../../models/user.js';
import Database from '../../database';
var bcrypt = require('bcrypt');

module.exports = (req, res, next) => {

    if (req.query.action && req.query.action == 'validate_pseudo') {
        return Database.pseudoExists(req.query.pseudo);
    }
    else if (req.query.action && req.query.action == 'check_user') {
        // return Database.mailExists(req.query.)
        Database.get()
        .then((db) => {
            db.collection('users')
            .findOne({
                email: req.query.email
            }).then((user) => {
                if (!user) {
                    res.send({
                        success: false
                    });
                }
                var hash = user.password;
                bcrypt.compare(req.query.password, hash)
                .then((same) => {
                    if (same) {
                        res.send({
                            success: true
                        });
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })
        })
    }
    else if (req.query.action && req.query.action == 'validate_email') {
        return Database.mailExists(req.query.email);
    }
};
