import * as tools from './routesHelpers.js';
module.exports = function (app) {

    // app.post('/user',
    // function(req, res, next) {
    //     next();
    // },
    // require('./controllers/users/create_user'));

    app.get('/user',
    function(req, res, next) {
        next();
    },
    require('./controllers/users/get_user'));

    app.post('/signup',
      require('./controllers/authentication').signup);

    app.post('/signin',
      require('./controllers/authentication').signin,
      (req, res) => {
        res.send({success: true});
      });
}
