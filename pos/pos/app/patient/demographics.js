'use strict';
angular.module('pos').controller('demographics', demographics);
demographics.$inject = ['$scope', 'patientService', 'utility'];
function demographics($scope, patientService, utility) {

    var vm = {
        patientModel: {},
        boolSelectList: utility.getBoolSelect(),
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(sex);
        //vm.patientModel.header = vm.patientModel.PatientName + " - Demographics";
    }
}

