'use strict'

angular.module('pos').factory('dashboardService', dashboardService);

dashboardService.$inject = ['$http'];

function dashboardService($http) {
    var model = {};

    var service = {
        model: model,
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {

    }

    function save() {

    }

}
