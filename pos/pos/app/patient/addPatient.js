'use strict';
angular.module('pos').controller('addPatient', addPatient);
addPatient.$inject = ['$scope', 'patientService', 'session', 'utility', 'formUtility'];
function addPatient($scope, patientService, session, utility, formUtility) {

    var vm = {
        patientModel: {},
        boolSelectList: session.lookups.BOOL,
        savePatient: savePatient,
        validateRequiedField: validateRequiedField,
        copyRef: copyRef,
        cancel: cancel
    };

    init();

    return vm;

    function init() {
        // initialization
        //vm.patientModel = patientService.patientModel;
        vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(vm.patientModel.Sex);
        vm.patientModel.lookups = session.lookups;


        //adding refsame for showing the checkbox
        vm.patientModel.RefSame = false;


        //vm.patientModel.header = vm.patientModel.PatientName + " - Demographics";
    }

    function savePatient(data) {

        var patient = angular.extend({}, vm.patientModel, data, { supressToastr: true });
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

    function validateRequiedField(fieldValue, fieldName) {
        return formUtility.requiredValidation(fieldValue, fieldName + " is required")
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

    function cancel(evt) {
        formUtility.cancelForm(evt, $scope.demographicsForm);
    }
}

