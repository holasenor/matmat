import axios from 'axios';
var _ = require('lodash');
import {browserHistory} from "react-router";
var $ = require("jquery");

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

export function likeThisId(id) {
    var token = localStorage.getItem('token');
    console.log(id);
    return axios.post('/togglelike', {
        id: id,
        token: token
    })
    .catch((err) => {
        console.log(err);
    });
}

export function toggleLike(mail) {
    var infos = {
        mailLikedOne : mail
    }
    return axios.post('/togglelike', infos)
    .then((res) => {
        console.log('this is res = ', res);
    });
}

export function logmeOut() {

}
