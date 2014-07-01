/**
 * Created by RYi on 6/30/2014.
 */


angular.module('tasksApp')
    .factory('ModelAPIResource', function ($resource) {
        return $resource('/api/models/');
    });
