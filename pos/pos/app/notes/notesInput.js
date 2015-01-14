'use strict'

angular.module('pos').directive('notesInput', notesInput);
notesInput.$inject = [];

function notesInput() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            inputList: '=',
        },
        template: '<notes-input-item ng-repeat="item in inputList" item="item">'
                + '<span ng-if="$first" ng-transclude></span>'
                + '</notes-input-item>'
    }
}





