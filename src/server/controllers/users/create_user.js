import User from '../../models/user.js';
import database from '../../database';
module.exports = (req, res, next) => {

    database.get().then((db) => {
        db.collection('users').insertOne({one: 'one'});
    })
    res.send('ok');
};
