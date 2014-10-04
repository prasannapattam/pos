'use strict';
angular.module('pos').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService'];

function dashboard(dashboardService) {

    var vm = {
        model: {},
    };

    init();

    return vm;

    function init() {

    }

}


