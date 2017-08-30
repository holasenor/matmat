var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var geolib = require('geolib');
var _ = require('lodash');

var state = {
    db: null,
}

exports.connect = function(url, done) {
    if (state.db) return done()

    MongoClient.connect(url, function(err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}

exports.get = function() {
    return new Promise(function(resolve,reject){
        resolve(state.db);
    });
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}

exports.mailExists = function (mail) {
    return this.get()
    .then((db) => {
        return db.collection('users')
        .findOne({email: mail})
        .then((o) => {
            var exists = (o != null) ? 1 : 0;
            return exists;
        });
    });
}

exports.pseudoExists = function (pseudo) {
    return this.get()
    .then((db) => {
        return db.collection('users')
        .findOne({pseudo: pseudo})
        .then((o) => {
            var exists = (o != null) ? 1 : 0;
            return exists;
        });
    })
}

exports.getUser = function (obj) {
    return this.get()
    .then((db) => {
        return db.collection('users')
        .findOne(obj);
    })
}

exports.updateUserData = function (userId, obj) {
    delete obj['id'];
    delete obj['token'];
    return this.get()
    .then((db) => {
        return db.collection('users')
        .updateOne({_id: ObjectId(userId)}, {$set: obj})
        .catch((err) => {
            console.log(err);
        });
    })
}

exports.addLike = function (user, mail) {

}

exports.getUsers = function (ids) {
    if (ids) {
        var obj_ids = ids.map(function(id) {
            return ObjectId(id);
        });
    }
    else {
        var obj_ids = [];
    }
    return this.get()
    .then((db) => {
        return db.collection('users')
        .find({
            _id: {
                $in: obj_ids
            }
        })
        .toArray();
    });
}

exports.getUsersFromSearch = function (options, myInfo) {
    return this.get()
    .then((db) => {
        return db.collection('users')
        .find(
            {
                age: {
                    $gt: options.ageInterval[0],
                    $lt: options.ageInterval[1]
                },
                popularity: {
                    $gt: options.popularityInterval[0],
                    $lt: options.popularityInterval[1]
                }
            }
        )
        .toArray()})
        .then((users) => {
            return users.filter((person) => {
                var distance = geolib.getDistance(
                    {latitude: person.lat, longitude: person.lng},
                    {latitude: myInfo.lat, longitude: myInfo.lng}
                )
                return (distance < options.distance * 1000)
            });
        })
        .then((users) => {
            if (options.tags && options.tags != "") {
                console.log('comparing options\n');
                return users.filter((person) => {
                    var personTag = person.tag.replace(/\s+/g, ' ').trim().split(' ');
                    var myInfoTag = myInfo.tag.replace(/\s+/g, ' ').trim().split(' ');
                    var optionsTags = options.tags.replace(/\s+/g, ' ').trim().split(' ');
                    console.log(personTag);
                    console.log(myInfoTag);
                    var tagsInCommon = _.intersection(personTag, myInfoTag);
                    var intersection = _.intersection(tagsInCommon, optionsTags)
                    return (intersection.length > 0);
                });
            }
            else {
                return users;
            }
        })
        // return this.get().then(() => {return options;});
    }
