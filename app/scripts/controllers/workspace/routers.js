/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // For any unmatched url, redirect to /state1
        $stateProvider
            .state('workspace', {
                url: '/workspace',
//                abstract: true,
                parent: 'root.workspace',
                views: {
                    'menu': {
                        templateUrl: 'partials/workspace/menu.html',
                        controller: 'WorkspaceMenuCtrl',
                        resolve: {
                            WorkspaceList: function(WorkspaceAPI) {
                                return WorkspaceAPI.query();
                            }
                        }

                    },
                    'list': {
                        templateUrl: 'partials/workspace/list.html',
                        controller: 'WorkspaceListCtrl'
                    },
                    'main': {
                        templateUrl: 'partials/workspace/main.html',
                        controller: 'WorkspaceMainCtrl'
                    }
                },
                authenticate: true
            })
            .state('workspace_item', {
                url: '/workspace/item/:id',
//                abstract: true,
                parent: 'root.workspace',
                views: {
                    'menu': {
                        templateUrl: 'partials/workspace/menu.html',
                        controller: 'WorkspaceMenuCtrl',
                        resolve: {
                            WorkspaceList1: function(WorkspaceAPI) {
                                return WorkspaceAPI.query();
                            }
                        }

                    },
                    'list': {
                        templateUrl: 'partials/workspace/list.html',
                        controller: 'WorkspaceListCtrl'
                    },
                    'main': {
                        templateUrl: 'partials/workspace/main.item.html',
                        controller: 'WorkspaceMenuCtrl'

                    }
                },
                authenticate: true
            });

    });
