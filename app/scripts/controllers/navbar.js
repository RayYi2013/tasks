'use strict';

angular.module('tasksApp')
  .controller('NavbarCtrl', function ($scope, $location, $state, Auth) {

        $scope.user = {};
        $scope.errors = {};

    $scope.menu = [{
      'title': 'Home',
      'link': 'root.main'
    }, {
      'title': 'Settings',
      'link': 'root.settings'
    }];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.login = function(form) {
        console.log('login');
        $scope.submitted = true;

        if(form.$valid) {
            Auth.login({
                email: $scope.user.email,
                password: $scope.user.password
            })
                .then( function() {
                    // Logged in, redirect to home
                    $state.go('user.index');
                    $scope.menu[0].link = 'workspace';
                })
                .catch( function(err) {
                    if(err.status===404) {
                        alert('invalid login name or password');
                    }
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
