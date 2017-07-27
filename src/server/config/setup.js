
module.exports = function (app) {
    app.connection
    .then((db) => {
        db.createCollection("users").then((cursor) => {
            cursor.insertOne({ name: "olivier", address: "Paris" });
        });
        return db;
    })
    .then((db) => {
        db.createCollection("photos")
        .then((cursor) => {
            cursor.insertOne({some:"some"});
        })
        .then(() => {
            db.close();
        });
    })
    .catch((err) => {
        if (err) {
            console.log('this is : ' + err);
        }
    });
}
