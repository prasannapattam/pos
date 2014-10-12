'use strict'

angular.module('pos').factory('utility', utility);
utility.$inject = ['toastr'];

function utility(toastr) {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory,
        showInfo: showInfo,
        showError: showError,
        iconPath: iconPath,
        routePath: routePath
    };

    return vm;

    function showInfo(message) {
        toastr.info(message);
    }

    function showError(message) {
        toastr.error(message);
    }

    function iconPath(filename) {
        return window.virtualDirectory + "/content/images/icons/" + filename;
    }

    function routePath(path) {
        return window.virtualDirectory + "/" + path;
    }

};

