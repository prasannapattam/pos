﻿'use strict'

angular.module('pos').factory('dashboardService', dashboardService);

dashboardService.$inject = ['$http'];

function dashboardService($http) {

    var service = {
        patientList: [],
        resolve: resolve,
    };

    return service;

    function resolve() {
        return $http.get("/api/dashboard")
            .success(function (data) {
                service.patientList = data
            })
    }

}
