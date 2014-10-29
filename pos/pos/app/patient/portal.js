'use strict';
angular.module('pos').controller('portal', portal);
portal.$inject = ['$scope', '$filter', 'patientService', 'utility'];
function portal($scope, $filter, patientService, utility) {

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
        savePatient: savePatient,
        boolSelectList: utility.getBoolSelect()
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.encounterGridOptions.data = patientService.patientModel.History;
        vm.patientModel.header = vm.patientModel.PatientName + " - Portal";

        $scope.$watch('vm.patientModel.Sex', function () {
            vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(vm.patientModel.Sex);
        });
    }

    function savePatient() {
        //splitting and saving the patient name
        var names = vm.patientModel.FullName.split(" ");
        names = names.filter(String);
        if(names.length > 3)
            return 'Please enter name as "First Middle Last"';
        else {
            vm.patientModel.FirstName = names[0];
            if (names.length == 2) {
                vm.patientModel.MiddleName = "";
                vm.patientModel.LastName = names[1];
            }
            else {
                vm.patientModel.MiddleName = names[1];
                vm.patientModel.LastName = names[2];
            }
        }
        return patientService.savePatient();
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

