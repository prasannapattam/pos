'use strict';
angular.module('pos').controller('demographics', demographics);
demographics.$inject = ['$scope', 'patientService', 'utility'];
function demographics($scope, patientService, utility) {

    var vm = {
        patientModel: {},
        boolSelectList: utility.getBoolSelect(),
        savePatient: savePatient,
        validatePatientNumber: validatePatientNumber,
        validateFirstName: validateFirstName,
        validateLastName: validateLastName
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(vm.patientModel.Sex);
        //vm.patientModel.header = vm.patientModel.PatientName + " - Demographics";
    }

    function savePatient(data) {

        var patient = angular.extend({}, vm.patientModel, data, {supressToastr: true});

        //splitting and saving the patient name
        var names = patient.FullName.split(" ");
        names = names.filter(String);
        if (names.length > 3)
            return 'Please enter name as "First Middle Last"';
        else {
            patient.FirstName = names[0];
            if (names.length == 2) {
                patient.MiddleName = "";
                patient.LastName = names[1];
            }
            else {
                patient.MiddleName = names[1];
                patient.LastName = names[2];
            }
        }

        return patientService.savePatient(patient)
                .catch(function (message) {
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
}

