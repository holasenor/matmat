import User from '../../models/user.js';
import database from '../../database';

module.exports = (req, res, next) => {

    database.get().then((db) => {
        db.collection('users')
        .findOne({pseudo: req.query.pseudo})
        .then((o) => {
                var exists = (o != null) ? 1 : 0;
                res.send({exists: exists});
        });
    })
};
