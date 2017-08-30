import axios from 'axios';
var _ = require('lodash');
import {browserHistory} from "react-router";

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

export function toggleLike(mail) {
    var infos = {
        mailLikedOne : mail
    }
    return axios.post('/tooglelike', infos)
    .then((res) => {
        console.log('this is res = ', res);
    })
}

export function logmeOut() {
    
}
