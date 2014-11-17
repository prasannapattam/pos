'use strict';
angular.module('pos').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService', 'navigation'];

function dashboard(dashboardService, navigation) {

    var gridOptions = {
        enableColumnResizing: true,
        columnDefs: [
                    { name: 'PatientName', field: 'PatientName', displayName: 'Name', cellTemplate: "<a href=\"#\" ng-click=\"getExternalScopes().navigateToPatient(row)\">{{grid.getCellValue(row, col)}}&nbsp;</a>" },
                    { name: 'PatientNumber', field: 'PatientNumber', displayName: 'Number' },
                    { name: 'DateOfBirth', field: 'DateOfBirth', displayName: 'Date of Birth', cellFilter: 'date:"MM/dd/yyyy"' },
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


