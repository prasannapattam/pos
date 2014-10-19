'use strict';
angular.module('pos').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService', 'navigation'];

function dashboard(dashboardService, navigation) {

    var gridOptions = {
        enableColumnResizing: true,
    columnDefs: [
                    { name: 'PatientName', field: 'PatientName', displayName: 'Name', cellTemplate: "<a href=\"#'\" ng-click=\"getExternalScopes().navigateToPatient(row)\">{{grid.getCellValue(row, col)}}&nbsp;</a>" },
                    { name: 'PatientNumber', field: 'PatientNumber', displayName: 'Number' },
                    { name: 'DOBString', field: 'DOBString', displayName: 'Date of Birth' },
                ]
        };


    var vm = {
        gridOptions: gridOptions,
        navigateToPatient: navigateToPatient
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = dashboardService.patientList;
    }

    function navigateToPatient(row) {
        navigation.gotoPatient(row.entity.ID, row.entity.PatientName);
    }
}


