'use strict';
angular.module('pos').controller('patient', patient);
patient.$inject = ['patientService'];
var title='Patient Search'
function patient(patientService) {
    var countryNames = [
          "Albania",
          "Andorra",
          "Armenia",
          "Austria",
          "Azerbaijan",
          "Belarus"
    ];
    var vm = {
        model: {},
        save: save,
        title: title,
        countryNames: countryNames
    };

    init();

    return vm;

    function init() {
        //var autoComplete = $("#patientAutoComplete").data("kendoAutoComplete");
        //autoComplete.bind("change", onChangeEvent);
        //function onChangeEvent() {
        //    alert('Change event occurs');
        //}
       
        return patientService.fetch().success(function (data) {
            //console.log(data);
            // vm.model = patientService.model;
            $("#patientAutoComplete").kendoAutoComplete({
                dataSource: countryNames
            });
        })
        .error(function (data, status, headers, config) {
            //console.log(data);
        });
    }
    //Not used
    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }
}

