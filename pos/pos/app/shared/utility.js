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
        getPhotoUrl: getPhotoUrl,
        getBoolSelect: getBoolSelect,
        lookupExists: lookupExists,
        getGridHeight: getGridHeight
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

    function getPhotoUrl(photoUrl) {
        if (photoUrl === null || photoUrl === "") {
            return window.virtualDirectory + "/Data/NoPhoto.jpg";
        }
        else {
            return window.virtualDirectory + "/Data/" + photoUrl + ".jpg";
        }

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

    function lookupExists(list, value) {

        for(var counter = 0; counter < list.length; counter ++){
            if (list[counter].FieldValue === value) {
                return true;
            }
        }

        return false;
    }

    function getGridHeight(gridClass) {
        var contentOffset = angular.element(document.getElementsByClassName('main-content')).offset();
        var contentHeight = angular.element(document.getElementsByClassName('main-content')[0]).height();
        var gridOffset = angular.element(document.getElementsByClassName(gridClass)).offset();
        if (gridOffset !== undefined) {
            var gridHeight = contentHeight - (gridOffset.top - contentOffset.top) - 10;
            return gridHeight + 'px';
        }
    }
};

