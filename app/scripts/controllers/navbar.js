'use strict';

angular.module('tasksApp')
  .controller('NavbarCtrl', function ($scope, $location, $state, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Settings',
      'link': '/settings'
    }];

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.login = function(form) {
            $scope.submitted = true;

            if(form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then( function() {
                        // Logged in, redirect to home
                        $state.go('root.workspace');
                        $scope.menu[0].link = 'workspace';
                    })
                    .catch( function(err) {
                        err = err.data;
                        $scope.errors.other = err.message;
                    });
            }
        };

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
