/**
 * Created by ray on 2014-05-27.
 */


angular.module('tasksApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl',
                onEnter: function(){
                    console.log("enter root.main");
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'partials/signup.html',
                controller: 'SignupCtrl'
            });
//            .state('root.settings', {
//                url: '/settings',
//                views: {
//                    'container@': {
//                        templateUrl: 'partials/settings.html',
//                        controller: 'SettingsCtrl'
//                    }
//                },
//                authenticate: true
//            })


        $locationProvider.html5Mode(true);

    });
