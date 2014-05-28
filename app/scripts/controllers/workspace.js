/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceCtrl', function ($scope, User, Auth) {
        $scope.menu = [{
            Id: 1,
            Name: "Project 1",
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
                Name: "Project 2",
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
