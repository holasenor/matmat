var database = require('../database');

module.exports = function () {
// database.get().createCollection('users').then((cursor) => {
//     cursor.insertOne({ name: "olivier", address: "Paris" });
// })
database.get().then((db) => {
    db.createCollection('users');
    return db;
})
.then((db) => {
    db.createCollection('photos');
})
.catch((err) => {
        if (err) {
            console.log('this is : ' + err);
        }
    });
// }
}
