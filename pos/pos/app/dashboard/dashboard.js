'use strict';
angular.module('pos').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService'];

function dashboard(dashboardService) {

    var vm = {
        patientList: {},
    };

    init();

    return vm;

    function init() {
        vm.patientList = dashboardService.patientList;
    }


}


