'use strict';
angular.module('pos').controller('portal', portal);
portal.$inject = ['patientService'];
function portal(patientService) {

    var vm = {
        patientModel: {}
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.patientModel.header = vm.patientModel.PatientName + " - Portal";
    }
}

