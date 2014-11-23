'use strict';
angular.module('pos').controller('demographics', demographics);
demographics.$inject = ['$scope', 'patientService', 'utility', 'session', '$mdDialog'];
function demographics($scope, patientService, utility, session, $mdDialog) {

    var vm = {
        patientModel: {},
        boolSelectList: utility.getBoolSelect(),
        savePatient: savePatient,
        validatePatientNumber: validatePatientNumber,
        validateFirstName: validateFirstName,
        validateLastName: validateLastName,
        copyRef: copyRef,
        cancel: cancel
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(vm.patientModel.Sex);

        //HxFrom
        if(!utility.lookupExists(session.lookups.HxFrom, "")){
            session.lookups.HxFrom.push({FieldDescription: "Other", FieldName: "HxFrom", FieldValue: ""});
        }
        if (utility.lookupExists(session.lookups.HxFrom, vm.patientModel.HxFrom)) {
            vm.patientModel.HxFromList = vm.patientModel.HxFrom;
            vm.patientModel.HxFromOther = '';
        }
        else {
            vm.patientModel.HxFromList = '';
            vm.patientModel.HxFromOther = vm.patientModel.HxFrom;
        }

        //adding refsame for showing the checkbox
        vm.patientModel.RefSame = false;


        //vm.patientModel.header = vm.patientModel.PatientName + " - Demographics";
    }

    function savePatient(data) {

        var patient = angular.extend({}, vm.patientModel, data, {supressToastr: true});
        patient.HxFrom = patient.HxFromList !== '' ? patient.HxFromList : patient.HxFromOther;

        return patientService.savePatient(patient)
                .then(function (result) {
                    vm.patientModel.FullName = patient.FirstName + ' ' + (patient.MiddleName === '' ? '' : patient.MiddleName + ' ') + patient.LastName;
                    vm.patientModel.HxFrom = patient.HxFrom;
                    return result;
                },
                function (message) {
                    $scope.demographicsForm.$setError('PatientNumber', message);
                    return message;
                });
    }

    function validatePatientNumber(patientNumber) {
        return requiredValidation(patientNumber, "Patient # is required")
    }

    function validateFirstName(firstName) {
        return requiredValidation(firstName, "First Name is required")
    }

    function validateLastName(lastName) {
        return requiredValidation(lastName, "Last Name is required")
    }

    function requiredValidation(attr, message) {
        if (attr.trim() === '') {
            return message;
        }

        return true;
    }

    function copyRef(checked) {
        
        //getting the ReferredDoctor control and setting the value
        if (checked) {
            var editables = $scope.demographicsForm.$editables;
            for (var counter = 0; counter < editables.length; counter++) {
                if (editables[counter].name === "ReferredDoctor") {
                    $scope.demographicsForm.$editables[counter].scope.$data = $scope.demographicsForm.$data.ReferredFrom;
                    break;
                }
            }
        }
    }

    function cancel(ev) {
        //$scope.confirmDialog.open().center();
        var confirm = $mdDialog.confirm()
          .title('Do you want to cancel and loose your changes?')
          .content('Clicking yes will loose your changes')
          .ariaLabel('Cancel modal window')
          .ok('Yes')
          .cancel('No')
          .targetEvent(ev)

        $mdDialog.show(confirm).then(function () {
            $scope.demographicsForm.$cancel()
        }, function () {
            //do nothing
        });
    }
}

