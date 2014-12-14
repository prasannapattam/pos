'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['notesService'];

function notes(notesService) {
    var vm = {
        model: {},
        init: init
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;
    }

}

