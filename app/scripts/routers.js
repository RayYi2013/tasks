/**
 * Created by ray on 2014-05-27.
 */


angular.module('tasksApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('root',{
                url: '',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'partials/navbar',
                        controller: 'NavbarCtrl'
                    },
                    'footer':{
                        templateUrl: 'partials/footer'
                    }
                }
            })
            .state('root.main', {
                url: '/',
                views: {
                    'container@': {
                        templateUrl: 'partials/main.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('root.login', {
                url: '/login',
                views: {
                    'container@': {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('root.signup', {
                url: '/signup',
                views: {
                    'container@': {
                        templateUrl: 'partials/signup.html',
                        controller: 'SignupCtrl'
                    }
                }
            })
            .state('root.settings', {
                url: '/settings',
                views: {
                    'container@': {
                        templateUrl: 'partials/settings.html',
                        controller: 'SettingsCtrl'
                    }
                },
                authenticate: true
            })
            .state('root.workspace', {
                url: '',
                abstract: true,
                views: {
                    'container@': {
                        templateUrl: 'partials/workspace.html',
                        controller: 'WorkspaceCtrl'
                    }
                },
                authenticate: true
            });

        $locationProvider.html5Mode(true);

    });
