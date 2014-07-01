(function(routes){
    var app;
    var apiPath;
    var projects = require('../../controllers/projects');
    var models = require('../../controllers/models');
    var index = require('../../controllers/index');
    var config = require('../config');

    routes.init = init;

    function init(_app_){
        app = _app_;
        apiPath = config.apiPath;
        configureProjectRoutes();
        configureModelRoutes();
        configureOthers();
    }

    function configureProjectRoutes(){
        // Server API Routes
        var path = apiPath + '/projects';
        app.get(path, projects.getList);
        app.post(path, projects.create);
        path = apiPath + '/projects/:name';
//        app.get(path, workspace.getWorkspace);
        app.put(path, projects.update);
        app.delete(path, projects.delete);

    }


    function configureModelRoutes(){
        // Server API Routes
        var path = apiPath + '/projects/:p_name/models';
        app.post(path, models.create);
        path = apiPath + '/projects/:p_name/models/m_name';
//        app.get(path, workspace.getWorkspace);
        app.put(path, models.update);
        app.delete(path, models.delete);

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
