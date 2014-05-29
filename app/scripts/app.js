'use strict';

angular.module('tasksApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
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
                else if (toState.name === 'root.main' && Auth.isLoggedIn()) {
                    $state.go("root.workspace.main");
                    event.preventDefault();
                    //$state.go('/login');
                }
            });


    });
