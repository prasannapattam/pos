angular.module('pos').directive('notesValue', notesValue);
notesValue.$inject = ['notesUtility'];

function notesValue(notesUtility) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            inputList: '=',
        },
        link: link,
        template: '<span ng-repeat="item in inputList" ng-class="{focusctrl:item.focusctrl, correctctrl: item.correctctrl}" ng-click="clearColourType(item)">{{item.Value}}</span>'
    }

    function link(scope, element, attrs, nullController, transclude) {
        scope.clearColourType = function (item) {
            notesUtility.clearColourType(item);
        }
    }
}

