'use strict'

angular.module('pos').factory('lookupService', lookupService);

lookupService.$inject = ['$http'];

function lookupService($http) {
    var model = {};

    var service = {
        model: model,
        resolve: resolve
    };

    return service;

    //this gets called from the routing. Use this to get data from webapi
    function resolve() {
        return $http.get("/api/lookup")
            .success(function (data) {
                service.model = data;
            });
    }
}
