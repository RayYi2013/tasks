/**
 * Created by RYi on 5/28/2014.
 */

'use strict';

angular.module('tasksApp')
    .controller('WorkspaceNewCtrl', function ($scope, $rootScope,$state, WorkspaceAPIResource) {

        $scope.newProject = function(form){
            if(form.$valid) {
                var data = { type: 'project',
                        name: $scope.name,
                        description: $scope.description,
                        tags: $scope.tags},
                    res = new WorkspaceAPIResource(data);

                res.$save()
                    .then(function(res)  {
                        var b = {
                            label: $scope.name,
                            data: data
                        };
                        $rootScope.$broadcast('new-project',b);
                        $state.go('workspace.item',{label:b.label});
                    })
                    .catch(function(req) { console.log("error saving obj"); })
                    .finally(function()  { console.log("always called") });
            }


        };


    });
