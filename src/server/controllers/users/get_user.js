import User from '../../models/user.js';
import database from '../../database';
var bcrypt = require('bcrypt');

module.exports = (req, res, next) => {

    if (req.query.action && req.query.action == 'validate_pseudo') {
        database.get()
        .then((db) => {
            db.collection('users')
            .findOne({pseudo: req.query.pseudo})
            .then((o) => {
                var exists = (o != null) ? 1 : 0;
                res.send({exists: exists});
            });
        })
    }
    else if (req.query.action && req.query.action == 'check_user') {
        database.get()
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
        database.get()
        .then((db) => {
            db.collection('users')
            .findOne({email: req.query.email})
            .then((o) => {
                var exists = (o != null) ? 1 : 0;
                res.send({exists: exists});
            });
        })
    }
};
