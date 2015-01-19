'use strict'

angular.module('pos').filter('boolText', boolText);

function boolText() {
    return function (boolValue) {
        if (boolValue === true || boolValue === "True")
            return "Yes";
        else
            return "No";
    }
}

