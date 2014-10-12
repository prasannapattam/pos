'use strict'

angular.module('pos').factory('patientService', patientService);

patientService.$inject = ['$http'];

function patientService($http) {
    var model = {};

    var service = {
        model: model,
        resolve: resolve,
        save: save
    };

    return service;

    //this gets called from the routing. Use this to get data from webapi
    function resolve(patientId) {
        return $http.get("/api/patient", { params: { id: patientId } })
            .success(function (data) {
                service.model = data;
            });
    }

    function save() {

    }

}
