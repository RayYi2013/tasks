(function(routes){
    var app;
    var apiPath;
    var workspace = require('../../controllers/workspace');
    var index = require('../../controllers/index');
    var config = require('../config');

    routes.init = init;

    function init(_app_){
        app = _app_;
        apiPath = config.apiPath;
        configureWorkspaceRoutes();
        configureOthers();
    }

    function configureWorkspaceRoutes(){
        // Server API Routes
        var path = apiPath + '/workspace';
        app.get(path, workspace.getList);
        app.post(path, workspace.create);
        path = apiPath + '/workspace/:id';
        app.get(path, workspace.getWorkspace);
        app.put(path, workspace.update);
        app.delete(path, workspace.delete);

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
