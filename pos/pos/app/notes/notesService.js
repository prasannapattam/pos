'use strict'

angular.module('pos').factory('notesService', notesService);

notesService.$inject = ['$http'];

function notesService($http) {
    var model = {};

    var service = {
        model: model,
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/notes")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

    function save() {

    }

}
