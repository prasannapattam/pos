'use strict'

angular.module('pos').factory('patientService', patientService);

patientService.$inject = ['$http'];

function patientService($http) {
    var model = {};

    var service = {
        model: model,
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/patient")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

    function save() {

    }

}
