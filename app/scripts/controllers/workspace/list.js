/**
 * Created by RYi on 5/28/2014.
 */

/**
 * Created by ray on 2014-05-27.
 */


'use strict';

angular.module('tasksApp')
    .controller('WorkspaceListCtrl', function ($scope,  $state) {
        var tree;
//        $scope.my_data = $scope.projectList;

        $scope.add_project = function() {
            $state.go('workspace.newProject');
        };

                $scope.$on('new-project', function(event, args) {
                    $scope.projectList[args.name.replace(/[^\w]/gi, '_')] = args;
                    $state.go('workspace', {}, {reload:true});
//                    scope.apply();
                });

    });
