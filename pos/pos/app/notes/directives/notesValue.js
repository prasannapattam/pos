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
        template: '<span ng-repeat="item in inputList" ng-class="{focusctrl:item.focusctrl, correctctrl: item.correctctrl}" ng-click="$parent.clearColourType(item)">{{$parent.getNotesValue(item)}}&nbsp;</span>'
    }

    function link(scope, element, attrs, nullController, transclude) {
        scope.getNotesValue = function (item) {
            if (item.LookUpFieldName === undefined || item.LookUpFieldName === null || item.LookUpFieldName === "") {
                return item.Value;
            }
            else {
                //return the display text of the dropdown
                return notesUtility.getNotesValue(item);
            }
        }
        scope.clearColourType = function (item) {
            notesUtility.clearColourType(item);
        }
    }
}

