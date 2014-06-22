/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .config(function ($stateProvider) {

        $stateProvider
            .state('workspace', {
                url: '/workspace',
//                abstract: true,
                templateUrl: 'partials/workspace.html',
                controller: 'WorkspaceCtrl',
                resolve: {
//                    WorkspaceAPI: 'WorkspaceAPI',
                    ProjectList: function(WorkspaceAPIResource) {
//                        var deferred = $q.defer();
//
//                        WorkspaceAPIResource.query(function(data) {
//                            console.log('resolve');
//                            deferred.resolve(data);
//                        }, function(err){
//                            console.log('reject');
//                            deferred.reject();
//                        });
//
//                        return deferred.promise;
                        return WorkspaceAPIResource.query().$promise;
                    }
                },
                authenticate: true
            })
            .state('workspace.new', {
                url: '/new',
                templateUrl: 'partials/workspace/new.html',
                controller: 'WorkspaceNewCtrl',
                onEnter: function(){
                    console.log("enter user");
                },
                authenticate: true
            })
            .state('workspace.item', {
                url: '/item/:label',
                templateUrl: 'partials/workspace/item.html',
                controller: 'WorkspaceItemCtrl',
                onEnter: function(){
                    console.log("enter user");
                },
                authenticate: true
            });

    });
