'use strict'

angular.module('AngularKendoBootstrapApp').factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {
    var model = {};

    var service = {
        model: model,
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/user")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

    function save() {

    }

}
