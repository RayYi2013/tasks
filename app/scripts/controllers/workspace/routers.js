/**
 * Created by ray on 2014-06-07.
 */

angular.module('tasksApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('user', {
                url: '',
                parent: 'root.main',
                abstract: true,
//                templateUrl: 'partials/workspace/list.html',
//                controller: 'WorkspaceListCtrl',
                views: {
                    'list': {
                        templateUrl: 'partials/workspace/list.html',
                        controller: 'WorkspaceListCtrl'
                    }
                },
                onEnter: function(){
                    console.log("enter user");
                },
                authenticate: true
            })
            .state('user.index', {
                url: 'index',
//                abstract: true,
//                templateUrl: 'partials/workspace/list.html',
//                controller: 'WorkspaceListCtrl',
                views: {
                    'main@root.main': {
                        templateUrl: 'partials/workspace/main.html',
                        controller: 'WorkspaceMainCtrl'
                    }
                },
                onEnter: function(){
                    console.log("enter user.index");
                },
                authenticate: true
            })
            .state('user.item', {
                url: 'item',
//                abstract: true,
//                templateUrl: 'partials/workspace/list.html',
//                controller: 'WorkspaceListCtrl',
                views: {
                    'main@root.main': {
                        templateUrl: 'partials/workspace/item.html',
                        controller: 'WorkspaceMainCtrl'
                    }
                },
                onEnter: function(){
                    console.log("enter user.item");
                },
                authenticate: true
            });

    });
