'use strict';
angular.module('pos').controller('patient', patient);
patient.$inject = ['$state','patientService', 'utility'];
function patient($state, patientService, utility) {

    var vm = {
        model: {},
        menuItems: [],
        save: save,
        menuSelect: menuSelect
    };

    init();

    return vm;

    function init() {
        // initialization
        vm.model = patientService.patientModel;
        vm.model.header = vm.model.PatientName;
        vm.menuItems = getMenuItems();
        vm.header = patientService.header;
    }

    function getMenuItems() {
        return [
                            { text: "Portal", url: utility.routePath("patient/" + vm.model.PatientID + "/portal"), imageUrl: utility.iconPath("portal.png"), cssClass: "k-state-highlight" },
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

    function menuSelect(ev) {
        //alert($(ev.item.firstChild).text());
        //vm.menuItems[0].cssClass = "k-state-highlight";
        $(ev.item).siblings().removeClass("k-state-highlight");
        $(ev.item).addClass("k-state-highlight");
    };

}

