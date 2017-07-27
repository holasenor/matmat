var User = function (data) {
    this.data = data;
}

User.prototype.data = {}

User.prototype.changeName = function (name) {
    this.data.name = name;
}

User.findById = function (id) {
    db.get('users', {id: id})
}

module.exports = User;
