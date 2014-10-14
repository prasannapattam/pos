'use strict'

angular.module('pos').factory('patientService', patientService);

patientService.$inject = ['$http', 'utility'];

function patientService($http, utility) {

    var service = {
        patientModel: {},
        resolve: resolve,
        save: save
    };

    return service;

    //this gets called from the routing. Use this to get data from webapi
    function resolve(patientId) {
        return $http.get("/api/patient", { params: { id: patientId } })
            .success(function (data) {
                service.patientModel = data;
                service.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(service.patientModel.Sex);
            });
    }

    function save() {

    }

}
