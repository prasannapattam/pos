﻿'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['$scope', 'notesService', 'formUtility'];

function notes($scope, notesService, formUtility) {
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
        vm.model.SpcWr1OD.ColourType = 1;
        vm.model.Mentation1.ColourType = 1;
        vm.model.Compliant.ColourType = 1;
        vm.model.ExamDate.ColourType = 1;

        vm.buttons = { 'SpcWr1OD': vm.model.SpcWr1OD, 'Compliant': vm.model.Compliant }
    }

    function saveNotes(data) {
        alert('saved');
    }

    function cancelNotes(evt) {
        formUtility.cancelForm(evt, $scope.notesForm);
    }

    function aftersavenotes() {
        alert(vm.model.SpcWr1OD.Value);
    }
}

