/**
 * Created by RYi on 5/28/2014.
 */
'use strict';

angular.module('tasksApp')
    .controller('WorkspaceMenuCtrl', function ($scope, List) {
        $scope.list = List;

        $scope.onClickMenu = function(evt, workspaceId){

        }
    });
