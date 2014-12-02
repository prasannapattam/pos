'use strict'

angular.module('pos').factory('notesService', notesService);

notesService.$inject = ['$http'];

function notesService($http) {

    var service = {
        model: {},
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/notes")
            .success(function (data) {
                service.model = data;
            });
    }

    function save() {

    }

}
