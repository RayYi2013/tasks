/**
 * Created by ray on 2014-06-29.
 */


angular.module('tasksApp')
    .directive("mflowProjects", ['$state', function ($state) {

        return {
            restrict: 'E',
            replace: true,

            templateUrl: 'partials/project/projects_template.html',
//            template:'<div class="mflow_project" ng-repeat="project in projects"></div>',
            scope: {
                data: '='
            },
            link: function (scope,el) {
                var projectList = scope.data,
                    projects = [],
                    hasExpand = false;

                angular.forEach(projectList, function(value, key) {
                    if((value.type) && (value.type === 'project')){
                        projects.push(value);
                        if(value.expand){
                            hasExpand = true;
                        }
                    }
                });

                if(projects.length>0 && !hasExpand){
                    projects[0].expand = true;
                }
                scope.projects = projects;

                scope.node = function(project, nodeType){
                    for( var i in project ) {
                        if (project.hasOwnProperty(i) && (project[i].type) && (project[i].type === nodeType)){
                            return project[i];
                        }
                    }
                    return {};
                };

                scope.nodeList = function(parent, nodeType){
                    var models = [];
                    angular.forEach(parent, function(value, key) {
                        if((value.type) && (value.type === nodeType)){
                            models.push(value);
                            if(value.expand){
                                hasExpand = true;
                            }
                        }
                    });

                    if(models.length>0 && !hasExpand){
                        models[0].expand = true;
                    }
                    return models;

                };

                scope.models = function(project){
                    return scope.nodeList(scope.node(project,'models'), 'model');
                };

                scope.clickProject = function (project){
                    var _key = '';
                    angular.forEach(projectList, function(value, key) {
                        if((value.type) && (value.type === 'project')){
                            value.expand = false;
                            if(project === value){
                                project.expand = true;
                                _key = key;
                            }
                        }
                    });

                    $state.go('project.edit', {name:_key});


                };

                scope.clickModel = function (project, model){
                    var _key = '';
                    angular.forEach(project, function(value, key) {
                        if((value.type) && (value.type === 'models')){
                            angular.forEach(value, function(value, key) {
                                if((value.type) && (value.type === 'model')){
                                    value.expand = false;
                                    if(model === value){
                                        model.expand = true;
                                        _key = key;
                                    }
                                }
                            });
                        }
                    });
//                    $state.go('workspace.project', {name:_key});


                };

//                scope.$on('new-project', function(event, args) {
//                    scope.projectList[args.name.replace(/[^\w]/gi, '_')] = args;
////                    scope.apply();
//                });



            }
        };

    }]);
