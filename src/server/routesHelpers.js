import axios from 'axios';
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
