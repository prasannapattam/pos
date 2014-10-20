'use strict';
angular.module('pos').controller('portal', portal);
portal.$inject = ['patientService'];
function portal(patientService) {

    var encounterGridOptions = {
        enableColumnResizing: true,
        columnDefs: [
                { name: 'ExamDate', field: 'ExamDate', displayName: 'Encounter History', cellTemplate: "<span>{{getExternalScopes().getHistoryText(row)}}</span>" },
        ]
    };

    var vm = {
        patientModel: {},
        encounterGridOptions: encounterGridOptions,
        getHistoryText: getHistoryText
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
        var text = row.entity.ExamDate;
        if(row.entity.CorrectExamID !== null){
            text += "(Corrected on " + ExamCorrectDate + ")";
        }
        else if(row.entity.SavedInd !== 1){
            text += "(Saved on " + LastUpdatedDate + ")";
        }
        return text;
        //<span data-bind="text: moment(ExamDate).format('L')"></span>
        //<span data-bind="css: {display_none : CorrectExamID === null}, text: '(Corrected on ' + moment(ExamCorrectDate).format('L') + ')'"></span>
        //<span data-bind="css: {display_none : SavedInd != 1}, text: '(Saved on ' + moment(LastUpdatedDate).format('L h:mm a') + ')'"></span>

    }
}

