angular.module('pos').directive('notesValue', notesValue);
notesValue.$inject = ['notesUtility'];

function notesValue(notesUtility) {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
        },
        link: link,
        template: '<span ng-class="{focusctrl:ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-click="clearColourType()">{{ngModel.Value}}</span>'
    }

    function link(scope, element, attrs, nullController, transclude) {
        scope.clearColourType = function () {
            notesUtility.clearColourType(scope.ngModel);
        }
    }
}

