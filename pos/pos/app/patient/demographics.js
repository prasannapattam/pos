'use strict';
angular.module('pos').controller('demographics', demographics);
demographics.$inject = ['patientService'];
function demographics(patientService) {

    var vm = {
        patientModel: {}
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
    }
}

