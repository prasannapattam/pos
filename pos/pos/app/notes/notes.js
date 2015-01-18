'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['notesService', 'formUtility'];

function notes(notesService, formUtility) {
    var vm = {
        model: {},
        init: init,
        saveNotes: saveNotes,
        cancelNotes: cancelNotes,
        buttons: {},
        aftersavenotes: aftersavenotes
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;

        vm.model.HxFromList = {
            Name: 'HxFromList',
            Value: vm.model.HxFrom.Value,
            LookUpFieldName: vm.model.HxFrom.LookUpFieldName,
            ColourType: vm.model.HxFrom.ColourType
        };

        vm.model.HxFromOther = {
            Name: 'HxFromOther',
            Value: vm.model.HxFrom.Value,
            LookUpFieldName: vm.model.HxFrom.LookUpFieldName,
            ColourType: vm.model.HxFrom.ColourType
        }

        //removing the weeks (fix for old data)
        if (vm.model.GA.Value === "weeks") {
            vm.model.GA.Value = "";
            vm.model.GA.ColourType = 0;
        }
        if (vm.model.PCA.Value === "weeks") {
            vm.model.PCA.Value = "";
            vm.model.PCA.ColourType = 0;
        }
    }

    function saveNotes(data) {
        //alert('saved');
    }

    function cancelNotes(evt, form) {
        formUtility.cancelForm(evt, form);
    }

    function aftersavenotes() {
        //alert(vm.model.SpcWr1OD.Value);
    }
}

