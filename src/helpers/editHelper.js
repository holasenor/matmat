import axios from 'axios';
var _ = require('lodash');
import {browserHistory} from "react-router";
import $ from "jquery";


const fields = ['pseudo','email', 'password', 'gender', 'like', 'bio', 'town', 'age', 'tag'];
const genders = ['male', 'female', '...'];
const likes = ['male', 'female', '...'];

export function getData(target) {
    var form = $('#formUpdate');
    return new Promise(function(resolve,reject){
        var data = {
            pseudo: form.find('#pseudo').val(),
            email: form.find('#email').val(),
            gender: form.find('#sexe').val(),
            like: form.find('#like').val(),
            tag: form.find('#tags').val(),
            bio: form.find('#message').val()
        }
        Object.keys(data).forEach(key => {
            if (data[key] == "") {
                throw 'Something is empty, please fill it';
            }
        });
        if (form.find('#subject').val() != "") {
            data.password = form.find('#subject').val();
        }
        resolve(data);
    });
}

export function updateUser(data) {
    data.token = localStorage.getItem('token');
    return axios.post('./updateuser', data)
    .then((response) => {
        localStorage.setItem('token', response.data.token);
        return response.data;
    })
}

export function deleteUser() {
    var data = {};
    data.token = localStorage.getItem('token');
    return axios.post('./deleteaccount', data)
    .then((response) => {
        if (response.data.success) {
            localStorage.removeItem('token');
    		localStorage.removeItem('username');
    		browserHistory.push("/");
        }
        else {
            if (response.data.message) {
                console.log(response.data.message);
            }
            else {
                alert('Your account was NOT deleted');
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });
}
