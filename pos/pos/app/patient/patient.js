'use strict';
angular.module('pos').controller('patient', patient);
patient.$inject = ['patientService'];

function patient(patientService) {
    var title = 'Patient Search'
   
    var patientName = [];
    var model = {
        FirstName: ""
    };
   // init();
    var vm = {
        model: model,
        save: save,
        title: title
    };

  

    return vm;

    function init() {
        //uncomment the below code to get the model from the webapi. The patientService.resolve will be called by routing 
        //which in turn fetches the records from webapi
        patientName = patientService.model;
       
    }
   

    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }
}

