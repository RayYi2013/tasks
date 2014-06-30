/**
 * Created by ray on 2014-06-29.
 */


angular.module('tasksApp')
    .controller('WorkspaceProjectCtrl', function ($scope, $stateParams) {

        $scope.project = $scope.projectList[$stateParams.name];

        $scope.saveProject = function(form){
            if(form.$valid) {
                var data = { type: 'project',
                        name: $scope.name,
                        description: $scope.description,
                        tags: $scope.tags,
                        expend: true},
                    res = new WorkspaceAPIResource(data);

                $rootScope.$broadcast('save-project',data);
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

