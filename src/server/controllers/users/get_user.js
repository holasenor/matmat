import User from '../../models/user.js';
import database from '../../database';

module.exports = (req, res, next) => {

    database.get().then((db) => {
        res.send('ok');
    })
};
