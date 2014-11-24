'use strict';
angular.module('pos').controller('dashboard', dashboard)
dashboard.$inject = ['$window', '$scope', 'dashboardService', 'navigation', 'uiGridConstants'];

function dashboard($window, $scope, dashboardService, navigation, uiGridConstants) {

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
        gridHeight: '415px'
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
        var contentOffset = angular.element(document.getElementsByClassName('main-content')).offset();
        var contentHeight = angular.element(document.getElementsByClassName('main-content')[0]).height();
        var gridOffset = angular.element(document.getElementsByClassName('patient-grid')).offset();
        if (gridOffset !== undefined) {
            var gridHeight = contentHeight - (gridOffset.top - contentOffset.top) - 10;
            vm.gridHeight = gridHeight + 'px';
        }
    }

    function navigateToPatient(row) {
        navigation.gotoPatient(row.entity.ID, row.entity.PatientName);
    }
}
