var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;

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
    var obj_ids = ids.map(function(id) {
        return ObjectId(id);
    });
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
