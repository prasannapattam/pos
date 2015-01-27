'use strict'

angular.module('pos').factory('notesUtility', notesUtility);
notesUtility.$inject = ['constants'];

function notesUtility(constants) {

    var vm = {
        clearColourType: clearColourType,
        setInputColours: setInputColours
    };

    return vm;

    function clearColourType(model) {
        if (model === undefined)
            return;
        if (model.ColourType === 1) {
            model.ColourType = 0;
            setInputColours(model);
        }
    }

    function setInputColours(model) {
        if (model === undefined)
            return;
        model.focusctrl = model.ColourType === constants.colourType.New;
        model.correctctrl = model.ColourType === constants.colourType.Correct;
    }

};
