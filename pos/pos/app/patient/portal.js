'use strict';
angular.module('pos').controller('portal', portal);
portal.$inject = ['$filter', 'patientService', 'utility'];
function portal($filter, patientService, utility) {

    var encounterGridOptions = {
        enableColumnResizing: true,
        columnDefs: [
                { name: 'ExamDate', field: 'ExamDate', displayName: 'Encounter History', enableSorting: false, disableColumnMenu: true, cellTemplate: encounterCellTemplate() },
        ]
    };

    var vm = {
        patientModel: {},
        encounterGridOptions: encounterGridOptions,
        getHistoryText: getHistoryText,
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.encounterGridOptions.data = patientService.patientModel.History;
        vm.patientModel.header = vm.patientModel.PatientName + " - Portal";
    }

    function getHistoryText(row) {
        var text = $filter('date')(row.entity.ExamDate, 'MM/dd/yyyy');
        if(row.entity.CorrectExamID !== null){
            text += '(Corrected on ' + $filter('date')(row.entity.ExamCorrectDate, 'MM/dd/yyyy') + ')';
        }
        else if(row.entity.SavedInd === 1){
            text += '(Saved on ' + $filter('date')(row.entity.LastUpdatedDate, 'MM/dd/yyyy h:mm a') + ')';
        }
        return text;
    }

    function encounterCellTemplate() {
        return "<div class='pull-left'>{{getExternalScopes().getHistoryText(row)}}</div>" 
            + "<div class='encounter-right'>"
            + "<a href='#'><img src='" + utility.virtualDirectory + "/content/images/icons/note-edit.png' title='Correct Notes' class='grid-icon' /></a>&nbsp;&nbsp;"
            + "<a target='_self' href='" + utility.virtualDirectory + "/api/print/{{row.entity.ExamID}}/1'><img src='" + utility.virtualDirectory + "/content/images/icons/mail.png' class='grid-icon' title='Print Letter' /></a>&nbsp;&nbsp;"
            + "<a target='_self' href='" + utility.virtualDirectory + "/api/print/{{row.entity.ExamID}}/2'><img src='" + utility.virtualDirectory + "/content/images/icons/printer.png' class='grid-icon' title='Print Notes' /></a>&nbsp;&nbsp;"
            + "</div>";
    }
}

