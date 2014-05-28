/**
 * Created by ray on 2014-05-27.
 */


angular.module('tasksApp')
    .factory('localStorageService', function ($rootScope) {

    return {

        get: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },

        save: function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },

        clearAll : function () {
            localStorage.clear();
        }
    };
});