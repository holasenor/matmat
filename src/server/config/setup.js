var database = require('../database');
import axios from 'axios';
import { ObjectId } from 'mongodb';

module.exports = function () {

   const myJson = {
	   "myData":[
		   {"_id": ObjectId("5996efeaf4efe2595a79f3de"),"pseudo":"Olivier", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"49.8965533", "lng":"2.3185364", "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":"35", "likes":["5996efeaf4efe2594a79f3de","5996efeaf3efe2594a79f3de"], "visits":[{who:"5996efeaf4efe2594a79f3de", when:"2014-02-10T10:50:57.240Z"}], "likedBy":["5996efeaf4efe2594a79f3de"]},
		   {"_id": ObjectId("5996efeaf4efe2594a79f3de"),"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "pictures":["https://cdn.intra.42.fr/users/medium_aribeiro.jpg"], "bio":"En recherche active", "popularity":"35", "likes":["5996efeaf4efe2594a79f3de", "5996efeaf3efe2594a79f3de"], "visits":[{who:"5996efeaf4efe2594a79f3de", when:"2014-02-10T10:50:57.240Z"}], "likedBy":["5996efeaf4efe2594a79f3de"]},
		   {"_id": ObjectId("5996efeaf3efe2594a79f3de"),"pseudo":"Johnny", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "pictures":["https://cdn.intra.42.fr/users/medium_default.png"], "bio":"En recherche active", "popularity":"35", "likes":["5996efeaf4efe2594a79f3de", "5996efeaf4efe2594a79f3de"], "visits":[{who:"5996efeaf4efe2594a79f3de", when:"2014-02-10T10:50:57.240Z"}], "likedBy":["5996efeaf4efe2594a79f3de"]},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb95"),"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "lat":"45.956614" , "lng":"2.352222", "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":"35"},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb96"),"pseudo":"FindPeople.js", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"48.8965533", "lng":"2.3185364", "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":"35"},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb97"),"pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "lat":"45.856614" , "lng":"12.352222", "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":"35"},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb98"),"pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "lat":"38.856614", "lng":"7.352222", "pictures":["https://cdn.intra.42.fr/users/medium_eozdek.jpg"], "bio":"En recherche active", "popularity":"35"},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb99"),"pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"female", "lat":"48.956614" , "lng":"2.352222", "pictures":["https://cdn.intra.42.fr/users/medium_jaubard.jpg"], "bio":"En recherche active", "popularity":"35"},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb9a"),"pseudo":"sergie", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "pictures":["https://cdn.intra.42.fr/users/medium_svelhinh.jpg"], "bio":"En recherche active", "popularity":"35"},
		   {"_id": ObjectId("599bdd23ce5f0c4125d8eb9b"),"pseudo":"pontoise", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "lat":"48.956614" , "lng":"2.352222", "pictures":["https://cdn.intra.42.fr/users/medium_grass-kw.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"female", "like":"male", "lat":"48.856614", "lng":"21.352222", "pictures":["https://cdn.intra.42.fr/users/medium_eozdek.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"male", "like":"male", "lat":"45.856614" , "lng":"12.352222", "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"female", "like":"male", "lat":"38.856614", "lng":"7.352222", "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"male", "like":"male", "lat":"48.956614" , "lng":"2.352222", "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"John", "email":"Doe@test.com", "age":"30","sexe":"male", "like":"female", "lat":"48.8965531", "lng":"21.352220", "pictures":["https://cdn.intra.42.fr/users/medium_oseng.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"Anna", "email":"Smith@test.com", "age":"18","sexe":"female", "like":"male", "lat":"45.856614" , "lng":"12.352222", "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"John", "email":"Doe@test.com", "age":"20","sexe":"male", "like":"male", "lat":"38.856614", "lng":"7.352222", "pictures":["https://cdn.intra.42.fr/users/medium_aribeiro.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"Anna", "email":"Smith@test.com", "age":"48","sexe":"female", "like":"female", "lat":"48.956614" , "lng":"2.352222", "pictures":["https://cdn.intra.42.fr/users/medium_pguzman.jpg"], "bio":"En recherche active", "popularity":"35"},
		   { "pseudo":"Peter", "email":"Jones@test.com", "age":"58","sexe":"male", "like":"male", "lat":"48.756614" , "lng":"2.952222", "pictures":["https://cdn.intra.42.fr/users/medium_stoussay.jpg"], "bio":"En recherche active", "popularity":"35"}
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
		   // not doing nothing here yet
		   // console.log(colors.rainbow('OMG Rainbows!'));
	   })
	   .catch((err) => {
		   console.log(err);
	   })
   })
   .catch((err) => {
	   console.log(err);
   });
}
