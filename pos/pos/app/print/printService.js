'use strict'

angular.module('pos').factory('printService', printService);

printService.$inject = ['$http'];

function printService($http) {
    var model = {};

    var service = {
        model: model,
        fetchQueue: fetchQueue
    };

    return service;

    function fetchQueue() {
        return $http.get("/api/PrintQueue")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

}
