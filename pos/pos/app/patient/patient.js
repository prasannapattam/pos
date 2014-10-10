'use strict';
angular.module('pos').controller('patient', patient);
patient.$inject = ['$http', 'patientService'];
function patient(patientService) {

    var vm = {
        model: {},
        save: save,
        title: title
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.model = patientService.model;
    }
   
  
    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }
}

