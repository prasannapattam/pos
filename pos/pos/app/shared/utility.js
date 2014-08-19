'use strict'

angular.module('pos').factory('utility', utility);
utility.$inject = ['toastr'];

function utility(toastr) {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory,
        showInfo: showInfo,
        showError: showError
    };

    return vm;

    function showInfo(message) {
        toastr.info(message);
    }

    function showError(message) {
        toastr.error(message);
    }
};

