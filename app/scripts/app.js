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
      .state('main', {
                url:'/',
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .state('login', {
                url:'/login',
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .state('signup', {
                url:'/signup',
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
        .state('workspace', {
            url:'/workspace',
            templateUrl: 'partials/workspace',
            controller: 'SignupCtrl'
        })
      .state('settings', {
                url:'/settings',
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      });
      
    $locationProvider.html5Mode(true);
      
  })
    .factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
        return {
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
                    $state.transitionTo("login");
                    event.preventDefault();
                    //$state.go('/login');
                }
            });


    });
