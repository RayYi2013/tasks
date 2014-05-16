/**
 * Created by RYi on 5/16/2014.
 */
angular.module('tasksApp')
    .directive("subMenu", ['$compile',function ($compile) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                menu: '='
            },
            template: '<ul class="dropdown-menu"><li ng-repeat="item in menu"><a class="ajax-link" href="ajax/charts_xcharts.html">{{item.Name}}</a></li></ul>',
            compile: function (el) {
                var contents = el.contents().remove();
                return function(scope,el){
                    $compile(contents)(scope,function(clone){
                        el.append(clone);
                    });
                };
            }
        };

    }])
    .directive("navigation", ['$compile',function ($compile) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                menu: '='
            },
            template: '<ul class="nav main-menu"><li class="dropdown" ng-repeat="item in menu"><a href="javascript:void(0);" class="dropdown-toggle"><span class="hidden-xs">{{item.Name}}</span></a><subMenu menu="item.Children"></subMenu></li></ul>',
            compile: function (el) {
                var contents = el.contents().remove();
                return function(scope,el){
                    $compile(contents)(scope,function(clone){
                        el.append(clone);
                    });
                };
            }
        };

    }]);