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

    init();

    return vm;

    function init() {
        var autocomplete = $("#Patients").kendoAutoComplete({
            minLength: 1,
            dataTextField: "PatientName",
            headerTemplate: '<div class="dropdown-header">' +
                    '<span class="k-widget k-header">Photo</span>' +
                    '<span class="k-widget k-header">Contact info</span>' +
                '</div>',
            template: '<span class="k-state-default"><img src=\"../content/web/Customers/#:data.PatientID#.jpg\" alt=\"#:data.PatientID#\" /></span>' +
                      '<span class="k-state-default"><h3>#: data.PatientName #</h3><p>Patient No. #: data.PatientNumber #</p><p>DOB #: data.DateOfBirth #</p></span>',
            dataSource: {
                transport: {
                    read: {
                        dataType: "json",
                        url: "/api/Patient"
                    }, //read
                    parameterMap: function () {// send value of autocomplete as the "startsWith" parameter
                        return {
                            FirstName: $("#Patients").data("kendoAutoComplete").value()
                        };
                    }
                }
            },
            height: 370,
        }).data("kendoAutoComplete");
    }
   
  
    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }
}

