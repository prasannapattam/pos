'use strict'

angular.module('pos').factory('patientService', patientService);

patientService.$inject = ['$http', 'utility'];

function patientService($http, utility) {

    var service = {
        patientModel: {},
        resolve: resolve,
        savePatient: savePatient,
        encounterButtonTemplate: encounterButtonTemplate,
        hideMenu: false,
        header: undefined
};

    return service;

    //this gets called from the routing. Use this to get data from webapi
    function resolve(patientId) {
        return $http.get("/api/patient", { params: { id: patientId } })
            .success(function (data) {
                service.patientModel = data;
                service.header = data.FullName;
            });
    }

    function savePatient(patient) {
        return $http.post("/api/patient", patient);
    }

    function encounterButtonTemplate() {
        return "<a href='" + utility.routePath("patient/" + service.patientModel.PatientID + "/notes/{{row.entity.ExamID}}") + "'><img src='" + utility.iconPath("note-edit.png") + "' title='Correct Notes' class='grid-icon' /></a>&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a target='_self' href='" + utility.routePath("api/print/{{row.entity.ExamID}}/1") + "'><img src='" + utility.iconPath("mail.png") + "' class='grid-icon' title='Print Letter' /></a>&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a target='_self' href='" + utility.routePath("api/print/{{row.entity.ExamID}}/2") + "'><img src='" + utility.iconPath("printer.png") + "' class='grid-icon' title='Print Notes' /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

}
