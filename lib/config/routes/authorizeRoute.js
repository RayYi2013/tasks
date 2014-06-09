(function(auth){
    var path = require('path'),
        config = require('../config'),
        authenticate = require(path.normalize(config.root + '/lib/modules/authenticate.js')),
        session = require(path.normalize(config.root + '/lib/controllers/session.js')),
        user = require(path.normalize(config.root + '/lib/controllers/users.js'));
    var app;

    auth.init = init;

    function init(_app_){
        app = _app_;
        app.use(config.apiPath, authenticate()); // We are going to protect /api routes with JWT
        handleUnauth();
        configureRoutes();
    }

    function configureRoutes(){
        //app.get(config.apiPath + '/restricted', pingRestricted);
        app.get('/session', session.verifyToken); //verify token
        app.post('/session', session.login); //login
        app.delete('/session', session.logout); //logout

        app.post('/users', user.create);  //sign up
    }

    function handleUnauth() {
        app.use(function (err, req, res, next) {
            if (err.constructor.name === 'UnauthorizedError') {
                res.send(401, 'Unauthorized');
            }
            else{
                res.send(401, 'Unauthorized');
            }
        });
    }

})(module.exports);
