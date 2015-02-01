'use strict'

angular.module('pos').factory('notesUtility', notesUtility);
notesUtility.$inject = ['constants', 'session', 'utility'];

function notesUtility(constants, session, utility) {

    var vm = {
        clearColourType: clearColourType,
        setInputColours: setInputColours,
        getNotesValue: getNotesValue
    };

    return vm;

    function clearColourType(item) {
        if (item === undefined)
            return;
        if (item.ColourType === 1) {
            item.ColourType = 0;
            setInputColours(item);
        }
    }

    function setInputColours(item) {
        if (item === undefined)
            return;
        item.focusctrl = item.ColourType === constants.colourType.New;
        item.correctctrl = item.ColourType === constants.colourType.Correct;
    }

    function getNotesValue(item) {
        var list = session.lookups[item.LookUpFieldName];

        return utility.lookupText(list, item.Value);


    }
};
