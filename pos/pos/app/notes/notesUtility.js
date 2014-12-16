'use strict'

angular.module('pos').factory('notesUtility', notesUtility);
notesUtility.$inject = ['constants'];

function notesUtility(constants) {

    var vm = {
        notesDirectivesLink: notesDirectivesLink
    };

    return vm;

    function notesDirectivesLink(scope, ctrlname) {
        scope.name = ctrlname.substring(ctrlname.lastIndexOf(".") + 1, ctrlname.length);
        setInputColours(scope);

        scope.clearColourType = function () {
            if (scope.ngModel.ColourType === 1) {
                scope.ngModel.ColourType = 0;
                setInputColours(scope);
            }
        }
    }
    function setInputColours(scope) {
        scope.ngModel.focusctrl = scope.ngModel.ColourType === constants.colourType.New;
        scope.ngModel.correctctrl = scope.ngModel.ColourType === constants.colourType.Correct;
    }

};
