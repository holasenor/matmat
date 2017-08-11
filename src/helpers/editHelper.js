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
    console.log('entering updateUser');
    data.token = localStorage.getItem('token');
    return axios.post('./updateuser', data)
    .then((response) => {
        console.log(response.data);
        return response.data;
    })
}
