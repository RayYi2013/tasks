/**
 * Created by ray on 2014-06-29.
 */

angular.module('tasksApp')
    .controller('WorkspaceNewProjectCtrl', function ($scope, $rootScope,$state, WorkspaceAPIResource) {

        $scope.newProject = function(form){
            if(form.$valid) {
                var data = { type: 'project',
                        name: $scope.name,
                        description: $scope.description,
                        tags: $scope.tags,
                    expend: true},
                    res = new WorkspaceAPIResource(data);

//                $rootScope.$broadcast('new-project',data);
                $scope.projectList[name.replace(/[^\w]/gi, '_')] = data;
                $state.go('workspace', {}, {reload:true});
//                res.$save()
//                    .then(function(res)  {
//                        var b = {
//                            label: $scope.name,
//                            data: data
//                        };
//                        $rootScope.$broadcast('new-project',b);
//                        $state.go('workspace.item',{label:b.label});
//                    })
//                    .catch(function(req) { console.log("error saving obj"); })
//                    .finally(function()  { console.log("always called") });
            }


        };


    });