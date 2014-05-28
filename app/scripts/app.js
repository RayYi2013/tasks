'use strict';

angular.module('tasksApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
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
                url: '/workspace',
                views: {
                    'container@': {
                        templateUrl: 'partials/workspace.html',
                        controller: 'MainCtrl'
                    }
                },
                authenticate: true
            });

    $locationProvider.html5Mode(true);
      
  })
    .factory('authHttpResponseInterceptor',['$q','$location','$rootScope', function($q,$location,$rootScope){
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($rootScope.token) {
                    config.headers.Authorization = 'Bearer ' + $rootScope.token;
                }
                return config;
            },
            response: function(response){
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401",rejection);
                    $location.path('/index').search('returnTo', $location.path());
                }
                return $q.reject(rejection);
            }
        }
    }])
    .config(function($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    })
    .run(function ($rootScope, $state, $stateParams, Auth) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if (toState.authenticate && !Auth.isLoggedIn()) {
                    $state.go("root.login");
                    event.preventDefault();
                    //$state.go('/login');
                }
            });


    });
