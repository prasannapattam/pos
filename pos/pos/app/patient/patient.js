'use strict';
angular.module('pos').controller('patient', patient);
patient.$inject = ['patientService'];

function patient(patientService) {
    var title = 'Patient Search'
    var countryNames = [
          "Albania",
          "Andorra",
          "Armenia",
          "Austria",
          "Azerbaijan",
          "Belarus"
    ];

    var model = {
        country: ""
    };

    var vm = {
        model: model,
        save: save,
        title: title,
        countryNames: countryNames
    };

    init();

    return vm;

    function init() {
        //uncomment the below code to get the model from the webapi. The patientService.resolve will be called by routing 
        //which in turn fetches the records from webapi
        //vm.model = patientService.model;
       
    }

    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }
}

