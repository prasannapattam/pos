'use strict';
angular.module('pos').controller('patient', patient);
patient.$inject = ['$state','patientService', 'utility'];
function patient($state, patientService, utility) {


    var vm = {
        model: {},
        menuItems: [],
        save: save,
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.model = patientService.model;
        vm.menuItems = getMenuItems();
    }

    function getMenuItems() {
        return [
                            { text: "Portal", url: utility.routePath("patient/" + vm.model.PatientID + "/portal"), imageUrl: utility.iconPath("portal.png") },
                            { text: "Demographics", url: utility.routePath("patient/" + vm.model.PatientID + "/demographics"), imageUrl: utility.iconPath("user.png") },
                            { text: "History", url: utility.routePath("users"), imageUrl: utility.iconPath("history.png") },
                            { text: "Documents", url: utility.routePath("defaults"), imageUrl: utility.iconPath("documents.png") },
        ];
    }
   
  
    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }
}

