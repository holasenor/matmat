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
    return axios.post('/togglelike', {
        id: id,
        token: token
    })
    .catch((err) => {
        console.log(err);
    });
}

export function getMyLikesInfo(myLikes) {
    var token = localStorage.getItem('token');
    return axios.get('/mylikesinfo', {
        params: {
            token: token,
            likes: myLikes
        }
    })
    .then((result) => {
        if (result.data.success) {
            return result.data.users;
        }
        else {
            console.log('No users were found');
            return [];
        }
    })
}

export function getUsersInfo(ids) {
    var token = localStorage.getItem('token');
    return axios.get('/getusers', {
        params: {
            token: token,
            ids: ids
        }
    })
    .then((result) => {
        if (result.data.success) {
            return result.data.users;
        }
        else {
            console.log('No users were found');
            return [];
        }
    })
}

export function getMyVisitorsInfo(myVisitors) {
    var token = localStorage.getItem('token');
    myVisitors = JSON.stringify(myVisitors);
    return axios.get('/myvisitorsinfo', {
        params: {
            token: token,
            visits: myVisitors
        }
    })
    .then((result) => {
        if (result.data.success) {
            return result.data.visits;
        }
        else {
            console.log('No visitors were found');
            return [];
        }
    })
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

export function addVisit(userId, visitorId) {
	var visitorId = visitorId;
	var token = localStorage.getItem('token');

	return axios.post('/addVisit', {
		userId: userId,
		visitorId: visitorId,
		token: token
	})
}

export function getSearchResults(myInfo, options) {
    var token = localStorage.getItem('token');

    return axios.get('/search', {
        params: {
            token: token,
            options: options,
            myInfo: myInfo
        }
    })
    .then((result) => {
        return result.data.users;
    });
}

export function blockThisId(id) {
    var token = localStorage.getItem('token');
    return axios.post('/blockid', {
        id: id,
        token: token
    })
    .catch((err) => {
        console.log(err);
    });
}

export function reportThisId(id) {
    var token = localStorage.getItem('token');
    return axios.post('/reportid', {
        id: id,
        token: token
    })
    .catch((err) => {
        console.log(err);
    });
}

export function sortPeopleBy(parameter, myPeople, isAscending) {
    myPeople.sort(function (person1, person2) {
        if (isAscending) {
            return person2[parameter] - person1[parameter];
        }
        return person1[parameter] - person2[parameter];
    });
    return myPeople;
}

export function sortPeopleByTags(myTags, myPeople, isAscending) {
    var myTagsArray = myTags.replace(/\s+/g, ' ').trim().split(' ');

    myPeople.sort(function (person1, person2) {
        var person1TagsArray = person1.tag.replace(/\s+/g, ' ').trim().split(' ');
        var person2TagsArray = person2.tag.replace(/\s+/g, ' ').trim().split(' ');
        var person1TagsInCommon = _.intersection(person1TagsArray, myTagsArray);
        var person2TagsInCommon = _.intersection(person2TagsArray, myTagsArray);
        if (isAscending) {
            return person2TagsInCommon.length - person1TagsInCommon.length;
        }
        return person1TagsInCommon.length - person2TagsInCommon.length;
    });
    return myPeople;
}
