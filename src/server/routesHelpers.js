import axios from 'axios';
var jwt = require('jsonwebtoken');
var _ = require('lodash');

export function sanitizeMongo(v) {
  if (v instanceof Object) {
    for (var key in v) {
      if (/^\$/.test(key)) {
        delete v[key];
      }
    }
  }
  return v;
};

export function tokenForUser(user) {
    var token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: 4000
    });
    return token;
}
