import axios from 'axios';
var _ = require('lodash');
import {browserHistory} from "react-router";
import Database from '../../database';


const fields = ['pseudo','email', 'password', 'gender', 'like', 'bio', 'town', 'age', 'tag'];
const genders = ['male', 'female', '...'];
const likes = ['male', 'female', '...'];

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

export function validateTarget(target) {
    return new Promise(function (res, rej) {
        var infos = {};
        _.forOwn(target, function (value, key) {
            if (_.includes(fields, key)) {
                if (value != "" && key != "") {
                    infos[key] = value;
                }
                else {
                    throw 'Something is missing';
                }
            }
        });
        res(infos)
    });
}

export function validateEmail(infos) {

    return new Promise(function(resolve,reject){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(infos.email)) {
            Database.mailExists(infos.email)
            .then((exists) => {
                if (exists) {
                    resolve();
                }
                resolve(infos);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            throw 'This is not a valid mail';
        }
    }).then((infos) => {
        if (!infos) {
            throw 'Email already used';
        }
        else {
            return infos;
        }
    });
}

export function validatePseudo(infos) {
    if (infos.pseudo != "") {
        return Database.pseudoExists(infos.pseudo)
        .then((exists) => {
            if (exists) {
                throw 'Pseudo already exists'
            }
            return infos;
        })
    }
    else {
        alert('Pseudo is empty');
        return false;
    }
}

export function validatePassword(infos) {
    return new Promise(function(resolve,reject){
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (re.test(infos.password)) {
            resolve(infos);
        }
        throw 'This is not a valid password';
    });
}

export function validateGender(infos) {
    return new Promise(function(resolve,reject){
        if (_.includes(genders, infos.gender)) {
            resolve(infos);
        }
        else {
            throw 'This is not a valid gender';
        }
    });
}

export function validateLike(infos) {
    return new Promise(function(resolve,reject){
        if (_.includes(likes, infos.like)) {
            resolve(infos);
        }
        else {
            throw 'This is not a valid \'like\' parameter';
        }
    });
}

export function validateBio(infos) {
    return new Promise(function(resolve,reject){
        if (infos.bio && infos.bio.length <= 150) {
            resolve(infos)
        }
        else {
            throw 'Your bio it\'s longer than 150 characters';
        }
    });
}

export function validateTown(infos) {
    return new Promise(function(resolve,reject){
        if (infos.town && infos.town.length <= 20) {
            resolve(infos)
        }
        else {
            throw 'Your town\'s name is too long';
        }
    });
}

export function validateAge(infos) {

    function isInteger(x) {
        return (typeof x === 'number') && (x % 1 === 0);
    }

    return new Promise(function(resolve,reject){
        infos.age = parseInt(infos.age);
        if (!isInteger(infos.age)) {
            throw 'Please put a number as you age';
        }
        if (infos.age && infos.age > 17 && infos.age <= 99) {
            resolve(infos)
        }
        else {
            throw 'You are not allowed, you are too old or too young for this sh*t';
        }
    });
}

export function validateTags(infos) {
    return new Promise(function(resolve,reject){
        var tags =infos.tag.trim().replace(/\s\s+/g, ' ').split(' ');
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].length > 10) {
                throw 'One of you tags is longer than 10 characters';
            }
        }
        resolve(infos);
    });
}

export function signUp(infos) {
    return axios.post('signup', infos)
    .then((res) => {
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', infos.email);
            console.log('token was generated and saved');
        }
        else {
            console.log('Something went wrong, you did not sign up');
        }
    })
}

export function checkUser(infos) {
    infos.action = 'check_user';
    return axios.get('user', {
        params: infos
    })
}

export function signIn(infos) {
    console.log('infos',infos);
    return axios.post('signin', infos)
    .then((res) => {
        if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', infos.email);
            console.log('token was generated and saved');
        }
        else {
            console.log('Something went wrong, you did not sign in');
        }
    })
}

export function checkTokenIsSet(location) {
	var token = localStorage.getItem('token');
    var username = localStorage.getItem('username');
    axios.post('/checktoken', {
        token:token,
        username:username
    })
    .then((res) => {
        if (!res.data.success) {
            if (location != 'main') {
                browserHistory.push("/");
            }
        }
        else {
            if (location == 'main') {
                browserHistory.push("/map");
            }
        }
    })
    .catch((err) => {
        console.log('errorr = ');
        console.log(err);
    });
}
