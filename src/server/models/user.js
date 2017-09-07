const Promise = require('bluebird');
var bcrypt = require('bcrypt');
Promise.promisifyAll(bcrypt);
var Database = require('../database');
const saltRounds = 6;
var ObjectId = require('mongodb').ObjectID;
var geolib = require('geolib');

const LIKE_ADDED = 1;
const ALREADY_LIKED = 0;

var User = function (data) {
	this.data = data;
}

User.create = function (data) {
	return Database.get().then((db) => {
		return new Promise(function(resolve,reject){
			bcrypt.genSalt(saltRounds, function(err, salt) {
				bcrypt.hash(data.password, salt, function(err, hash) {
					data.password = hash;
					db.collection('users')
					.insertOne(data)
					.then((res) => {
						var user = {
							pseudo: data.pseudo,
							email: data.email,
							id: res.insertedId
						}
						resolve(user);
					})
					.catch((err) => {
						console.log(err);
					});
				});
			});
		})
		.catch((err) => {
			console.log(err);
		})
	});
}

User.comparePassword = function (passwordToCompare, hash) {
	return bcrypt.compare(passwordToCompare, hash);
}

User.findByMail = function (email) {
	return Database.get().then((db) => {
		return db.collection('users').findOne({email: email});
	})
}

User.findById = function (id) {
	return Database.get().then((db) => {
		return db.collection('users').findOne({_id: ObjectId(id)});
	})
}

User.changePassword = function (token, hash) {
	return Database.get()
	.then((db) => {
		return db.collection('users')
		.updateOne({resetPasswordToken: token}, {$set:{password: hash}})
		.then((a) => {
			return db.collection('users')
			.update({resetPasswordToken: token}, { $unset : {resetPasswordToken: 1} })
			.catch((err) => {
				console.log(err);
			});
		})
		.catch((err) => {
			console.log(err);
		});
	})
	.catch((err) => {
		console.log(err);
	});
}

User.addResetPasswordToken = function (mail,token) {
	return Database.get()
	.then((db) => {
		return db.collection('users').updateOne({email: mail}, {$set:{resetPasswordToken: token}});
	})
	.catch((err) => {
		console.log(err);
	});
}

User.getEmail = function () {
	return new Promise(function (res, rej) {
		User.asdf = localStorage.getItem('username')
		res(localStorage.getItem('username'));
	});
}

User.toggleLike = function () {
	console.log('this user has mail ' + User.asdf);
}

User.addLike = function (userId, likedId) {
	var likeAction = 0;
	var messageToSend = "default message";
	var wasItALike = 0;
	return Database.get()
	.then((db) => {
		return db.collection('users')
		.updateOne({_id: ObjectId(userId)}, { $addToSet: {likes: likedId.toString()}})
		.then((res) => {
			likeAction = res.result.nModified;
			return db;
		})
	})
	.then((db) => {
		if (likeAction == ALREADY_LIKED) {
			return db.collection('users')
			.updateOne({_id: ObjectId(userId)}, { $pull: {likes: likedId.toString()}})
			.then((res) => {
				return db.collection('users')
				.updateOne({_id: ObjectId(likedId)}, { $pull: {likedBy: userId}})
				.then((res) => {
					console.log("\n",userId, ' does not like ', likedId, " anymore\n");
					messageToSend = 'User remove like';
					return db;
				})
			})
		}
		else if (likeAction == LIKE_ADDED) {
			wasItALike = 1;
			return db.collection('users')
			.updateOne({_id: ObjectId(likedId)}, { $addToSet: {likedBy: userId}})
			.then((res) => {
				console.log("\n",userId, ' likes ', likedId, "\n");
				messageToSend = 'like was successful';
				return db;
			})
		}
	})
	.then((db) => {
		var variation;
		if (wasItALike) variation = 1;
		else variation = -1;
		return db.collection('users')
		.updateOne({
			_id: ObjectId(likedId)
		}, {
			$inc: {
				popularity: variation
			}
		})
	})
	.then(() => {
		return {
			message: messageToSend
		}
	})
	.catch((err) => {
		console.log('Error in addLike');
		console.log(err);
	})
}

User.wasLikedBy = function () {

}
User.delete = function (id) {
	return Database.get().then((db) => {
		return db.collection('users').deleteOne({_id: ObjectId(id)});
	})
}

User.addPicture = function (id, path) {
	var pictureToDeleteLater;
	return Database.get().then((db) => {
		return db.collection('users')
		.findOne({_id: ObjectId(id)}).then((res) => {
			if (res.pictures && res.pictures[4]) {
				pictureToDeleteLater = res.pictures[0];
			}
			else {
				pictureToDeleteLater = false;
			}
			return db;
		})
	})
	.then((db) => {
		return db.collection('users')
		.updateOne({ _id: ObjectId(id), "pictures.4": { "$exists": 1 } },{ $pop: { pictures: -1 } } )
		.then((res) => {
			return db;
		});
	})
	.then((db) => {
		return db.collection('users')
		.update({ _id: ObjectId(id) },{ $push: { pictures: { $each:[ path ], $slice : 5} }})
		.then((res) => {
			return pictureToDeleteLater;
		});
	})
	.catch((err) => {
		console.log(err);
	})
}

function getGenderToDisplay(myInfo) {
    console.log(myInfo);
    if (myInfo.like == 'male') {
        return 'male'
    }
    else if (myInfo.like == 'female') {
        return 'female'
    }
    else {
        return { $in: ['male', 'female', 'both'] }
    }
}

User.getMyPeople = function (myInfo) {
	var genderToDisplay = getGenderToDisplay(myInfo);
	return Database.get()
	.then((db) => {
		return db.collection('users').find({gender: genderToDisplay}).toArray();
	})
	.then((everyone) => {
		var myPeople = everyone.filter((someone) => {
			var lat = parseFloat(someone.lat);
			var mylat = parseFloat(myInfo.lat);
			var lng = parseFloat(someone.lng);
			var mylng = parseFloat(myInfo.lng);
			var distance = geolib.getDistance(
				{latitude: lat, longitude: lng},
				{latitude: mylat, longitude: mylng}
			);
			delete someone.password;
			someone.distance = distance;
			return (distance < 50000 && someone._id != myInfo._id)
		})
		return myPeople;
	})
}

User.addOneVisit = function(userId, idVisitor) {
	console.log(userId, idVisitor, Date.now());
	var newVisits = [];
	var newVisit = {
		id: idVisitor,
		time: Date.now()
	};
	return Database.get()
	.then((db) => {
		return db.collection('users')
		.findOne({_id: ObjectId(userId)})
		.then((user) => {
			if (user.visits && user.visits.length && user.visits.length == 5) {
				user.visits.shift();
				user.visits.push(newVisit);
				newVisits = user.visits;
			}
			else {
				user.visits.push(newVisit);
				newVisits = user.visits;
			}
			return db;
		})
	})
	.then((db) => {
		return db.collection('users')
		.updateOne({
			_id: ObjectId(userId)
		}, {
			$set: {
				visits: newVisits
			}
		})
		.then((res) => {
			return res.result;
		})
	})
	.catch((err) => {
		console.log(err);
	})
}

User.blockSomeone = function(myId, idToBlock) {
	return Database.get()
	.then((db) => {
		return db.collection('users')
		.updateOne({_id: ObjectId(myId)}, {$addToSet: {block: idToBlock.toString()}})
		.then((res) => {
			return res;
		})
	})
	.then((result) => {
		if (result.result.nModified) {
			return 'added';
		}
		else if (result.result.nModified == 0){
			return 'already';
		}
		else {
			return 'error';
		}
	})
	.catch((err) => {
		console.log(err);
	})
}

module.exports = User;
