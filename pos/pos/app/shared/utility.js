'use strict'

angular.module('pos').value('utility', utility());

function utility() {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory
    };

    return vm;

};

