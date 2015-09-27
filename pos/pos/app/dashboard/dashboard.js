'use strict';
angular.module('pos').controller('dashboard', dashboard)
dashboard.$inject = ['$window', '$scope', 'dashboardService', 'navigation', 'uiGridConstants', 'utility'];

function dashboard($window, $scope, dashboardService, navigation, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        columnDefs: [
                    { name: 'PatientName', field: 'PatientName', displayName: 'Name', cellTemplate: "<a href=\"#\" ng-click=\"getExternalScopes().navigateToPatient(row)\">{{grid.getCellValue(row, col)}}&nbsp;</a>", enableHiding: false },
                    { name: 'PatientNumber', field: 'PatientNumber', displayName: 'Number', enableHiding: false },
                    { name: 'DateOfBirth', field: 'DateOfBirth', displayName: 'Date of Birth', cellFilter: 'date:"MM/dd/yyyy"', enableHiding: false },
                ]
        };


    var vm = {
        gridOptions: gridOptions,
        navigateToPatient: navigateToPatient,
        gridHeight: '0px',
        newPatient: newPatient
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = dashboardService.patientList;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getGridHeight('patient-grid');
    }

    function navigateToPatient(row) {
        navigation.gotoPatient(row.entity.ID, row.entity.PatientName);
    }

    function newPatient() {
        navigation.newPatient();
    }
}
