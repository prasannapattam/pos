'use strict'

angular.module('pos').factory('printService', printService);

printService.$inject = ['$http'];

function printService($http) {
    var model = {};

    var service = {
        model: model,
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/print")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

    function save() {

    }

}
