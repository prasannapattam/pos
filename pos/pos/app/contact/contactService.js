﻿'use strict'

angular.module('pos').factory('contactService', contactService);

contactService.$inject = ['$http'];

function contactService($http) {
    var model = {};

    var service = {
        model: model,
        resolve: resolve,
        save: save
    };

    return service;

    function resolve() {
        return $http.get("/api/contact")
            .success(function (data) {
                angular.extend(model, data);
            });
    }

    function save() {
        return $http.post("/api/contact", model)
            .success(function (data) {

            });
    }

}
