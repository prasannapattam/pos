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
    function resolve() {
        //return $http.get("/api/contact")
        //    .success(function (data) {
        //        service.model = data;
        //    });
    }

    function save() {

    }

}
