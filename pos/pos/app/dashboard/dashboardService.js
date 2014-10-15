'use strict'

angular.module('pos').factory('dashboardService', dashboardService);

dashboardService.$inject = ['$http'];

function dashboardService($http) {

    var service = {
        patientList: [],
        resolve: resolve,
        save: save
    };

    return service;

    function resolve() {
        return $http.get("/api/dashboard")
            .success(function (data) {
                service.patientList = data
            })
    }

    function save() {

    }

}
