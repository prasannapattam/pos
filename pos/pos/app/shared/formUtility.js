'use strict'

angular.module('pos').factory('formUtility', formUtility);
formUtility.$inject = ['$mdDialog', '$window'];

function formUtility($mdDialog, $window) {
    var vm = {
        requiredValidation: requiredValidation,
        cancelForm: cancelForm,
        cancelFormGoBack: cancelFormGoBack
    };

    return vm;

    function requiredValidation(attr, message) {
        if (attr === null || attr.trim() === '') {
            return message;
        }

        return true;
    }

    function cancelForm(evt, form) {

        var confirm = showDialog(evt);

        if (form !== undefined) {
            $mdDialog.show(confirm).then(function () {
                $mdDialog.cancel();
            }, function () {
                //do nothing
            });
        }
        else {
            return $mdDialog.show(confirm);
        }
    }

    function cancelFormGoBack(evt, form) {

        var confirm = showDialog(evt);

        if (form !== undefined) {
            $mdDialog.show(confirm).then(function () {
                $mdDialog.cancel();
                $window.history.back();
            }, function () {
                //do nothing
            });
        }
        else {
            return $mdDialog.show(confirm);
        }

    }

    function showDialog(evt) {
        return $mdDialog.confirm()
              .title('Do you want to cancel and loose your changes?')
              .content('Clicking yes will loose your changes')
              .ariaLabel('Cancel modal window')
              .ok('Yes')
              .cancel('No')
              .targetEvent(evt);
    }
}