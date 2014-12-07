'use strict';
angular.module('pos').controller('encounterHistory', encounterHistory);
encounterHistory.$inject = ['$scope', '$filter', '$window', 'patientService', 'utility', 'uiGridConstants'];
function encounterHistory($scope, $filter, $window, patientService, utility, uiGridConstants) {

    var encounterGridOptions = {
        enableColumnMenus: false,
        enableSorting: false,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        columnDefs: [
                { name: 'ExamDate', field: 'ExamDate', displayName: 'Exam Date', cellTemplate: encounterDateTemplate()},
                { name: 'Doctor', field: 'Doctor', displayName: 'Doctor', width: '300' },
                { name: 'ExamID', field: 'ExamID', displayName: '', cellTemplate: encounterButtonTemplate(), width: '140' },
        ]
    };

    var vm = {
        patientModel: {},
        encounterGridOptions: encounterGridOptions,
        getHistoryText: getHistoryText,
        gridHeight: '0px'
};

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.encounterGridOptions.data = patientService.patientModel.History;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }


    function getHistoryText(row) {
        var text = $filter('date')(row.entity.ExamDate, 'MM/dd/yyyy');
        if (row.entity.CorrectExamID !== null) {
            text += '(Corrected on ' + $filter('date')(row.entity.ExamCorrectDate, 'MM/dd/yyyy') + ')';
        }
        else if (row.entity.SavedInd === 1) {
            text += '(Saved on ' + $filter('date')(row.entity.LastUpdatedDate, 'MM/dd/yyyy h:mm a') + ')';
        }
        return text;
    }

    function encounterDateTemplate() {
        return '<div layout="row"><span flex class="text-nowrap">{{getExternalScopes().getHistoryText(row)}}</span>';
    }

    function encounterButtonTemplate() {
        return "<a href='#'><img src='" + utility.virtualDirectory + "/content/images/icons/note-edit.png' title='Correct Notes' class='grid-icon' /></a>&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a target='_self' href='" + utility.virtualDirectory + "/api/print/{{row.entity.ExamID}}/1'><img src='" + utility.virtualDirectory + "/content/images/icons/mail.png' class='grid-icon' title='Print Letter' /></a>&nbsp;&nbsp;&nbsp;&nbsp;"
            + "<a target='_self' href='" + utility.virtualDirectory + "/api/print/{{row.entity.ExamID}}/2'><img src='" + utility.virtualDirectory + "/content/images/icons/printer.png' class='grid-icon' title='Print Notes' /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

    function resizeGrid() {
        vm.gridHeight = utility.getGridHeight('encounter-grid');
    }



}

