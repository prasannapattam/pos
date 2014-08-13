'use strict';

angular.module('pos').controller('notestest', notestest);
notestest.$inject = ['notestestService'];

function notestest(notestestService) {
    var vm = {
        model: {},
        init: init
    };

    init();

    return vm;

    function init() {
        vm.model = notestestService.model;
    }

}

