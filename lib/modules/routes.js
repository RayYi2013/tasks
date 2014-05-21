(function(routes){
    var app;
    var apiPath;
    var api = require('../controllers/api');
    var index = require('../controllers');

    routes.init = init;

    function init(_app_){
        app = _app_;
        apiPath = app.config.apiPath;
        configureRoutes();
        configureOthers();
    }

    function configureRoutes(){
        // Server API Routes
        app.route(apiPath + '/awesomeThings')
            .get(api.awesomeThings);

    }

    function configureOthers(){
        // All undefined api routes should return a 404
        app.route(apiPath + '/*')
            .get(function(req, res) {
                res.send(404);
            });

        // All other routes to use Angular routing in app/scripts/app.js
        app.route('/partials/*')
            .get(index.partials);
        app.route('/*')
            .get( index.index);


    }
})(module.exports);
