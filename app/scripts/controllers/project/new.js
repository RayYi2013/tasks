/**
 * Created by ray on 2014-06-29.
 */

angular.module('tasksApp')
    .controller('NewProjectCtrl', function ($scope, $rootScope,$state, ProjectAPIResource) {

        $scope.newProject = function(form){
            if(form.$valid) {
                var data = { type: 'project',
                        name: $scope.name,
                        description: $scope.description,
                        tags: $scope.tags,
                        expend: true},
                    res = new ProjectAPIResource(data);

//                $rootScope.$broadcast('new-project',data);
//                $scope.projectList[name.replace(/[^\w]/gi, '_')] = data;

                res.$save()
                    .then(function(res)  {
                        $state.go('project.edit', {name:$scope.name.replace(/[^\w]/gi, '_')}, {reload:true});
                    })
                    .catch(function(req) { console.log("error saving obj"); })
                    .finally(function()  { console.log("always called") });
            }


        };


    });