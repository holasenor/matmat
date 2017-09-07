import axios from 'axios';
var _ = require('lodash');
import {browserHistory} from "react-router";
import $ from "jquery";
var path = require('path');
const uuidv4 = require('uuid/v4');
var mime = require('mime-types')

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

export function checkMimeType(infos) {
	if (infos.file)	{
		var fileName = infos.file.name;
		var mimetype = mime.contentType(fileName);
		if (mimetype != 'image/jpeg' && mimetype != 'image/jpg' && mimetype != 'image/png')
		{
			throw 'error mime type : not a jpg, png or jpeg, sorry.';
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
