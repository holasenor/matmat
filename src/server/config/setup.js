var database = require('../database');
import axios from 'axios';
import { ObjectId } from 'mongodb';

module.exports = function () {

    const myJson = {
        "myData":[
            {"_id": ObjectId("5996efeaf4efe2594a79f4de"),"pseudo":"Olivier", "email":"Doe@test.com", "age":30,"sexe":"male", "like":"female", "lat":49.8965533, "lng":2.3185364, "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":13, "likes":["5996efeaf4efe2594a79f3de"], "likedBy": [], "visits": [], "tag": "velo boire femmes hashtag 123 234 345"},
            {"_id": ObjectId("5996efeaf4efe2594a79f3de"),"pseudo":"John", "email":"Doe@test.com", "age":20,"sexe":"male", "like":"male", "lat":38.856614, "lng":6.652222, "pictures":["https://cdn.intra.42.fr/users/medium_aribeiro.jpg"], "bio":"En recherche active", "popularity":56,"likes":[], "likedBy": ["5996efeaf4efe2594a79f4de"], "visits": [], "tag": "velo boire femmes hashtag 123 234 345"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb95"),"pseudo":"Homer", "email":"Smith@test.com", "age":48,"sexe":"female", "like":"female", "lat":45.956614 , "lng":2.35222, "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "velo boire femmes hashtag 123 234 345"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb96"),"pseudo":"FindPeople.js", "email":"Doe@test.com", "age":30,"sexe":"male", "like":"female", "lat":48.8965533, "lng":3.3185364, "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":76, "likes": [], "likedBy": [], "visits": [], "tag": "   velo  asdf boire femmes hashtag 123 234 345"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb97"),"pseudo":"Morty", "email":"Smith@test.com", "age":18,"sexe":"male", "like":"male", "lat":45.8556614 , "lng":12.352222, "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "    velo boire femmes hashtag 123 234 345"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb98"),"pseudo":"John", "email":"Doe@test.com", "age":20,"sexe":"female", "like":"male", "lat":48.01556614, "lng":9.352222, "pictures":["https://cdn.intra.42.fr/users/medium_eozdek.jpg"], "bio":"En recherche active", "popularity":65, "likes": [], "likedBy": [], "visits": [], "tag": "   auto    789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb99"),"pseudo":"Rick", "email":"Smith@test.com", "age":48,"sexe":"male", "like":"female", "lat":48.9563614 , "lng":2.35222, "pictures":["https://cdn.intra.42.fr/users/medium_jaubard.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "   auto  asdf   789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb5f"),"pseudo":"Juan", "email":"Smith@test.com", "age":48,"sexe":"female", "like":"female", "lat":48.93756614 , "lng":2.452222, "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9a"),"pseudo":"sergie", "email":"Doe@test.com", "age":20,"sexe":"male", "like":"male", "lat":36.856614, "lng":7.352222, "pictures":["https://cdn.intra.42.fr/users/medium_svelhinh.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": " asdf auto    789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9b"),"pseudo":"pontoise", "email":"Smith@test.com", "age":48,"sexe":"male", "like":"male", "lat":50.956614 , "lng":2.35222, "pictures":["https://cdn.intra.42.fr/users/medium_grass-kw.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9c"),"pseudo":"John", "email":"Doe@test.com", "age":30,"sexe":"female", "like":"male", "lat":49.856614, "lng":21.352222, "pictures":["https://cdn.intra.42.fr/users/medium_eozdek.jpg"], "bio":"En recherche active", "popularity":26, "likes": [], "likedBy": [], "visits": [], "tag": "auto  femmes  789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9d"),"pseudo":"Ash", "email":"Smith@test.com", "age":18,"sexe":"male", "like":"male", "lat":45.856234614 , "lng":12.352222, "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9e"),"pseudo":"John", "email":"Doe@test.com", "age":20,"sexe":"female", "like":"male", "lat":38.8546614, "lng":8.352222, "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":54, "likes": [], "likedBy": [], "visits": [], "tag": "auto  femmes  789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb9f"),"pseudo":"Jon", "email":"Smith@test.com", "age":48,"sexe":"male", "like":"male", "lat":46.956614 , "lng":2.35222, "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto    789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb8f"),"pseudo":"John", "email":"Doe@test.com", "age":30,"sexe":"male", "like":"female", "lat":48.89645531, "lng":21.352220, "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "auto femmes  789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb7f"),"pseudo":"Anna", "email":"Smith@test.com", "age":18,"sexe":"female", "like":"male", "lat":45.856614 , "lng":12.352222, "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "         auto  asdf  789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb6f"),"pseudo":"John", "email":"Doe@test.com", "age":20,"sexe":"male", "like":"male", "lat":37.856614, "lng":7.352222, "pictures":["https://cdn.intra.42.fr/users/medium_aribeiro.jpg"], "bio":"En recherche active", "popularity":32, "likes": [], "likedBy": [], "visits": [], "tag": "perro 123   789"},
            {"_id": ObjectId("599bdd23ce5f0c4125d8eb4f"),"pseudo":"Peter", "email":"Jones@test.com", "age":58,"sexe":"male", "like":"male", "lat":48.756614 , "lng":6.952222, "pictures":["https://cdn.intra.42.fr/users/medium_stoussay.jpg"], "bio":"En recherche active", "popularity":25, "likes": [], "likedBy": [], "visits": [], "tag": "velo    789"}
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
