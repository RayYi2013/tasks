'use strict';

angular.module('tasksApp')
    .controller('MainCtrl', function ($scope, $http,Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $http.get('/api/awesomeThings').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
    });
