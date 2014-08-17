﻿'use strict'

angular.module('pos').factory('accountService', accountService);

accountService.$inject = ['$http', 'profile'];

function accountService($http, profile) {
    var model = {};

    var service = {
        model: model,
        validate: validate
    };

    return service;

    function validate(model) {
        return $http.post("/api/login", model)
            .success(function (data) {
                profile.populate(data);
            });
    }

}
