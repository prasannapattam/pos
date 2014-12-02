'use strict'

angular.module('pos').factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {

    var service = {
        model: [],
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/user")
            .success(function (data) {
                service.model = data;
            });
    }

    function save() {

    }

}
