import User from '../../models/user.js';
import Database from '../../database';
var bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    console.log(req.user);
    console.log('update_user');
};
