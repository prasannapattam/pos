'use strict';
angular.module('pos').controller('demographics', demographics);
demographics.$inject = ['$scope', 'patientService', 'utility'];
function demographics($scope, patientService, utility) {

    var vm = {
        patientModel: {}
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.patientModel = patientService.patientModel;
        //vm.patientModel.header = vm.patientModel.PatientName + " - Demographics";

        $scope.$watch('vm.patientModel.Sex', function () {
            vm.patientModel.PhotoUrl = utility.getDefaultPatientPhoto(vm.patientModel.Sex);
        });
    }
}

