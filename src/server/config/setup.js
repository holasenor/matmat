var database = require('../database');
import axios from 'axios';
import { ObjectId } from 'mongodb';

module.exports = function () {

    const myJson = {
        "myData":[
            {"_id": ObjectId("5996efeaf4efe2594a79f4de"),"pseudo":"Olivier", "email":"Doe@test.com", "age":30,"gender":"male", "like":"female", "lat":48.808538, "lng":2.333075, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":13, "likes":["5996efeaf4efe2594a79f3de"], "likedBy": [], "visits": [], "tag": "velo boire femmes hashtag 123 234 345", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9a"),"pseudo":"Sergie", "email":"Doe@test.com", "age":20,"gender":"male", "like":"male", "lat":48.842309, "lng":2.253123, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": " asdf auto    789", block: []},
            {"_id": ObjectId("5996efeaf4efe2594a79f3de"),"pseudo":"John", "email":"Doe@test.com", "age":20,"gender":"male", "like":"male", "lat":48.876975, "lng":2.294573, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":56,"likes":[], "likedBy": ["5996efeaf4efe2594a79f4de"], "visits": [], "tag": "velo boire femmes hashtag 123 234 345", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb95"),"pseudo":"Homer", "email":"Smith@test.com", "age":48,"gender":"male", "like":"female", "lat":48.934984 , "lng":2.312864, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "velo boire femmes hashtag 123 234 345", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb96"),"pseudo":"Hombre", "email":"Doe@test.com", "age":30,"gender":"male", "like":"female", "lat":48.8965533, "lng":3.3185364, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":76, "likes": [], "likedBy": [], "visits": [], "tag": "   velo  asdf b oire femmes hashtag 123 234 345", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb97"),"pseudo":"Morty", "email":"Smith@test.com", "age":18,"gender":"male", "like":"male", "lat":48.828834 , "lng":2.434728, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "    velo boire femmes hashtag 123 234 345", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb98"),"pseudo":"Lucie", "email":"Doe@test.com", "age":20,"gender":"female", "like":"male", "lat":48.01556614, "lng":2.352222, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":65, "likes": [], "likedBy": [], "visits": [], "tag": "   auto    789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb99"),"pseudo":"Rick", "email":"Smith@test.com", "age":48,"gender":"male", "like":"female", "lat":48.9563614 , "lng":2.35222, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "   auto  asdf   789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb5f"),"pseudo":"Juana", "email":"Smith@test.com", "age":48,"gender":"female", "like":"female", "lat":48.93756614 , "lng":2.452222, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9b"),"pseudo":"Perro", "email":"Smith@test.com", "age":48,"gender":"male", "like":"male", "lat":48.802074 , "lng":2.677171, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9c"),"pseudo":"La Loca", "email":"Doe@test.com", "age":30,"gender":"female", "like":"male", "lat":49.044057, "lng":2.427604, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":26, "likes": [], "likedBy": [], "visits": [], "tag": "auto  femmes  789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9d"),"pseudo":"Juan II", "email":"Smith@test.com", "age":18,"gender":"male", "like":"male", "lat":48.963442, "lng":2.516345, "pictures":["man.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9e"),"pseudo":"Lisa", "email":"Doe@test.com", "age":20,"gender":"female", "like":"male", "lat":48.821726, "lng":2.405182, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":54, "likes": [], "likedBy": [], "visits": [], "tag": "auto  femmes  789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9f"),"pseudo":"Natalia", "email":"Smith@test.com", "age":48,"gender":"female", "like":"male", "lat":48.896349 , "lng":2.448943, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb8f"),"pseudo":"Kim", "email":"Doe@test.com", "age":30,"gender":"female", "like":"female", "lat":48.950889, "lng":2.371785, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto femmes  789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb7f"),"pseudo":"Anna", "email":"Smith@test.com", "age":18,"gender":"female", "like":"male", "lat":48.913427 , "lng":2.430272, "pictures":["hgirl.jpeg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "         auto  asdf  789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb6f"),"pseudo":"Irma", "email":"Doe@test.com", "age":20,"gender":"female", "like":"male", "lat":48.906404, "lng":2.403503, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":32, "likes": [], "likedBy": [], "visits": [], "tag": "perro 123   789", block: []},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb4f"),"pseudo":"Woman", "email":"Jones@test.com", "age":58,"gender":"female", "like":"male", "lat":48.891247 , "lng":2.393943, "pictures":["girl.jpeg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "velo    789", block: []}
        ]
    };

    axios.defaults.port = 3000;

    database.get().then((db) => {
        db.createCollection('users');
        return db;
    })
    .then((db) => {
        db.createCollection('photos');
        return db
    })
    .then((db) => {
        return db.collection('users')
        .insertMany(myJson.myData)
        .then((res) => {
            console.log('\nFAKE USERS WERE LOADED FOR THE FIRST TIME\n');
        })
        .catch((err) => {
            if (err.code == 11000) {
                console.log('\nFAKE USERS WERE ALREADY LOADED\n');
            }
        })
    })
    .catch((err) => {
        console.log(err);
    });
}
