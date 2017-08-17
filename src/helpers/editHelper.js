import axios from 'axios';
var _ = require('lodash');
import {browserHistory} from "react-router";
import $ from "jquery";
var path = require('path');
const uuidv4 = require('uuid/v4');

const fields = ['pseudo','email', 'password', 'gender', 'like', 'bio', 'town', 'age', 'tag'];
const genders = ['male', 'female', '...'];
const likes = ['male', 'female', '...'];

// var file = form.find('#photo')[0].files[0];
// var formData = new FormData();
// var fileName
// formData.append('photo', file, fileName);
// formData.append('token', localStorage.getItem('token'));
// const config = {
//     headers: { 'content-type': 'multipart/form-data' }
// }
// axios.post('./upload', formData, config)
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
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
        var fileToUpload = form.find('#photo')[0].files[0];
        if (fileToUpload) {
            data.file = fileToUpload;
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

export function validateFileSize(infos) {
    if (infos.file) {
        var fileSize = infos.file.size;
        if (fileSize > 500000) {
            throw 'File is too big';
        }
    }
    return infos;
}

export function validateFileExtension(infos) {
    if (infos.file) {
        var fileName = infos.file.name;
        if (path.extname(fileName) != ".jpg" && path.extname(fileName) != ".png" && path.extname(fileName) != ".jpeg") {
            throw 'File extension must be jpg, png or jpeg, sorry.';
        }
    }
    return infos;
}

export function uploadFile(infos) {
    if (infos.file) {
        var formData = new FormData();
        var fileName = uuidv4() + ".jpg";
        formData.append('photo', infos.file, fileName);
        formData.append('token', localStorage.getItem('token'));
        formData.append('fileName', fileName);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        return axios.post('./upload', formData, config)
        .then((res) => {
            if (res.data.success == false) {
                throw 'Something went wrong, probably file size or file extension';
            }
            return infos;
        })
    }
    return infos;
}
