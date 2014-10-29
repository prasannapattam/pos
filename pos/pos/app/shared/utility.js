'use strict'

angular.module('pos').factory('utility', utility);
utility.$inject = ['toastr', 'constants'];

function utility(toastr, constants) {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory,
        showInfo: showInfo,
        showError: showError,
        iconPath: iconPath,
        routePath: routePath,
        getDefaultPatientPhoto: getDefaultPatientPhoto,
        getBoolSelect: getBoolSelect
    };

    return vm;

    function showInfo(message) {
        if (message !== null && message !== "")
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

    function getDefaultPatientPhoto(sex) {
        if(sex === constants.sex.male)
            return window.virtualDirectory + "/content/images/icons/patient-male.png";
        else
            return window.virtualDirectory + "/content/images/icons/patient-female.png";
    }

    function getBoolSelect() {
        return [
            { value: true, text: 'Yes' },
            { value: false, text: 'No' }
        ];
    }
};

