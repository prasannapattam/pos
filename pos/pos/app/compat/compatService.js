'use strict'

angular.module('AngularKendoBootstrapApp').factory('compactService', compactService);

compactService.$inject = ['$http'];

function compactService($http) {
    var model = {};

    var service = {
        model: model,
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/compact")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

    function save() {

    }

}
