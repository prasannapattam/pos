'use strict';
angular.module('pos').controller('portal', portal);
portal.$inject = ['$scope', '$filter', 'patientService', 'session', 'utility', 'uiGridConstants', '$state'];
function portal($scope, $filter, patientService, session, utility, uiGridConstants, $state) {

    var encounterGridOptions = {
        enableColumnMenus: false,
        enableSorting: false,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
        columnDefs: [
                { name: 'ExamDate', field: 'ExamDate', headerCellTemplate:  encounterHeaderTemplate(),  cellTemplate: encounterCellTemplate(), width: '100%' },
        ]
    };

    var vm = {
        patientModel: {},
        encounterGridOptions: encounterGridOptions,
        getHistoryText: getHistoryText,
        savePatient: savePatient,
        validatePatientName: validatePatientName,
        validatePatientNumberAndSave: validatePatientNumberAndSave,
        patientPhotoUrl: patientPhotoUrl,
        boolSelectList: session.lookups.BOOL,
        navigateNotes: navigateNotes
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        //TODO: patientService.patientModel is not refreshed, so added the below once resolved should remove this.
        patientService.resolve(vm.patientModel.PatientID).then(function () {
            vm.patientModel = patientService.patientModel;
            vm.encounterGridOptions.data = patientService.patientModel.History;
        });
        //vm.encounterGridOptions.data = patientService.patientModel.History;
        vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(vm.patientModel.Sex);
    }

    function validatePatientName(patientName) {
        var names = patientName.split(" ");
        names = names.filter(String);
        if (names.length > 3 || names.length < 2)
            return 'Please enter name as "First Middle Last"';
        else
            return true;
    }

    function validatePatientNumberAndSave(patientNumber) {
        var patient = angular.extend({}, vm.patientModel, { PatientNumber: patientNumber, supressToastr: true });
        return patientService.savePatient(patient);
    }

    function patientPhotoUrl(sex) {
        vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(sex);
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
        return patientService.savePatient(vm.patientModel);
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
        return '<div layout="row"><span flex class="text-nowrap">{{getExternalScopes().getHistoryText(row)}}</span>' + patientService.encounterButtonTemplate() + '</div>';
    }    
    
    function navigateNotes() {
        $state.go('patient.notes', { patientid: vm.patientModel.PatientID, notesid: '' });
    }

    function encounterHeaderTemplate() {
        return '<div layout="row"  layout-align="space-between center">'
            + '<span flex class="text-nowrap">Encounter History</span>' 
            + '<md-button type="button" class="md-raised" ng-click="getExternalScopes().navigateNotes();">New Notes</md-button>'
            + '</div>';
    }
    
}

