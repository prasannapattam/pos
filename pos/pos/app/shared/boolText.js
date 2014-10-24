'use strict'

angular.module('pos').filter('boolText', boolText);

function boolText() {
    return function (value) {
        if (value === true) 
            return "Yes";
        else
            return "No";
    }
}