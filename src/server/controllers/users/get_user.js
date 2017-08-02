import User from '../../models/user.js';
import database from '../../database';

module.exports = (req, res, next) => {
    console.log('-------');
    console.log(req.query);
    console.log('-------');

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
        // database.get()
        // .then((db) => {
        //     db.collection('users')
        //     .findOne({})
        // })
    }
};
