/**
 * Created by RYi on 5/16/2014.
 */

'use strict';

angular.module('tasksApp')
    .controller('MainMenuCtrl', function ($scope, $http) {
        $scope.menu = [{
            Id: 1,
            Name: "Contact",
            Children: [{
                Name: "Testing",
                Children: []
            },{
                Name: "More Testing",
                Children: [{
                    Name: '3rd Level',
                    Children: []
                }]
            }]
        },
            {
                Id: 1,
                Name: "Contact2",
                Children: [{
                    Name: "Testing",
                    Children: []
                },{
                    Name: "More Testing",
                    Children: [{
                        Name: '3rd Level',
                        Children: []
                    }]
                }]
            }];
    });
