'use strict';
angular.module('pos').controller('demographics', demographics);
demographics.$inject = ['patientService'];
function demographics(patientService) {

    var vm = {
        model: {}
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.model = patientService.model;
    }
}

