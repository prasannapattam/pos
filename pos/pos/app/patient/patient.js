﻿'use strict';
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
        vm.menuItems = getMenu();
        vm.header = patientService.header;
    }

    function getMenu() {
        return [
                    getMenuItem("Portal", "portal", "portal.png"),
                    getMenuItem("Demographics", "demographics", "user.png"),
                    getMenuItem("History", "history", "history.png"),
                    getMenuItem("Documents", "documents", "documents.png")
            ];
    }
   
    function getMenuItem(text, url, iconPath) {
        var cssClass = "";
        var hash = utility.routePath("patient/" + vm.model.PatientID + "/" + url);
        var currentHash = $state.href($state.current.name, $state.params);
        if (hash === currentHash) {
            cssClass = "k-state-highlight";
        }
        return { text: text, url: hash, imageUrl: utility.iconPath(iconPath), cssClass: cssClass };
    }
  
    function save() {
        patientService.save().success(function () {
            alert('Saved');
        });
    }

    function menuSelect(ev) {
        alert('activate')
        //$(ev.item).siblings().removeClass("k-state-highlight");
        //$(ev.item).addClass("k-state-highlight");
    };

}

