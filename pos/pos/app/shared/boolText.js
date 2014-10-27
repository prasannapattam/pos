'use strict'

angular.module('pos').filter('boolText', boolText);

function boolText() {
    return function (boolValue) {
        if (boolValue === true)
            return "Yes";
        else
            return "No";
    }
}

