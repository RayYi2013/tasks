'use strict';

angular.module('tasksApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
    .run(function ($rootScope, $state, $stateParams, Auth) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if (toState.authenticate && !Auth.isLoggedIn()) {
                    $state.go('/login');
                }
            });

        // Intercept 401s and redirect you to login
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error){
                console.log('stateChangeError');
                console.log(toState, toParams, fromState, fromParams, error);

                if(error.status == 401){
                    console.log("401 detected. Redirecting...");

                    $state.go("login");
                }
            });
    });
