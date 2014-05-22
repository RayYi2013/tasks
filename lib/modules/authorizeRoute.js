(function(auth){
    var account = require('./account-manager.js');
    var authenticate = require('./authenticate.js');
    var app;

    auth.init = init;

    function init(_app_){
        app = _app_;
        app.use(app.config.apiPath, authenticate()); // We are going to protect /api routes with JWT
        handleUnauth();
        configureRoutes();
    }

    function configureRoutes(){
        app.get(app.config.apiPath + '/restricted', pingRestricted);
        app.post('/authenticate', validateAuth); //login
        app.delete('/authenticate', deleteAuth); //logout

        app.post('/user', createAuth);  //sign up
    }

    function handleUnauth() {
        app.use(function (err, req, res, next) {
            if (err.constructor.name === 'UnauthorizedError') {
                res.send(401, 'Unauthorized');
            }
        });
    }

    function pingRestricted (req, res, next) {
        console.log('user ' + req.username + ' is calling /api/restricted');
        res.json({
            name: 'ping restricted api'
        });
    }

    function validateAuth (req, res) {
        //validate req.body.email and req.body.password
        var email = req.body.email;
        var password = req.body.password;
        account.validateAccount(email, password)
            .then(function(user){
                return account.createToken(user);
            })
            .then(function(token){
                res.json({ token: token });
            })
            .catch(function(err){
                //if is invalid, return 401
                var msg = err.message || 'Wrong user or password';
                res.send(401, msg);
                return;
            });

    }

    function createAuth (req, res) {
        //validate req.body.email and req.body.password
        var user = req.body;
        account.createAccount(user)
            .then(function(newUser){
                return account.createToken(newUser);
            })
            .then(function(token){
                res.json({ token: token });
            })
            .fail(function(err){
                //if is invalid, return 401
                var msg = err.message || "can't create user";
                res.send(401, msg);
                return;
            });

    }

    function deleteAuth (req, res) {
        //validate req.body.email and req.body.password
        var user = req.body;
        account.createAccount(user)
            .then(function(newUser){
                return account.createToken(newUser);
            })
            .then(function(token){
                res.json({ token: token });
            })
            .fail(function(err){
                //if is invalid, return 401
                var msg = err.message || "can't create user";
                res.send(401, msg);
                return;
            });

    }

})(module.exports);
