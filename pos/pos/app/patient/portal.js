'use strict';
angular.module('pos').controller('portal', portal);
portal.$inject = ['patientService'];
function portal(patientService) {

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

