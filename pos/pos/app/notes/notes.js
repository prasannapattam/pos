'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['notesService', 'session', 'formUtility', 'utility'];

function notes(notesService, session, formUtility, utility) {
    var vm = {
        model: {},
        doctors: [],
        init: init,
        saveNotes: saveNotes,
        cancelNotes: cancelNotes,
        aftersavenotes: aftersavenotes,
        utility: utility
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;
        vm.doctors = notesService.doctors;

        //UI related changes to the model
        //vm.model.Premature.LookUpFieldName = "BOOL";

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

        //HxFrom
        if (utility.lookupExists(session.lookups.HxFrom, vm.model.HxFrom.Value)) {
            vm.model.HxFromList.Value = vm.model.HxFrom.Value;
            vm.model.HxFromOther.Value = '';
        }
        else {
            vm.model.HxFromList.Value = '';
            vm.model.HxFromOther.Value = vm.model.HxFrom.Value;
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

