'use strict'

angular.module('pos').directive('notesText', notesText);
angular.module('pos').directive('notesSelect', notesSelect);

notesText.$inject = ['constants'];
function notesText(constants) {

    var directive = {
        restrict: 'E',
        require: '^ngModel',
        //transclude:'element',
        //replace:true,
        scope: {
            ngModel: '='
        },
        link: link,
        template: '<input ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()">'
    }

    return directive;

    function link(scope, element, attrs) {
        scope.ngModel.focusctrl = scope.ngModel.ColourType === constants.colourType.New;
        scope.ngModel.correctctrl = scope.ngModel.ColourType === constants.colourType.Correct;

        scope.clearColourType = function () {
            if (scope.ngModel.ColourType === 1) {
                scope.ngModel.ColourType = 0;
            }
        }

    }
}

notesSelect.$inject = ['constants'];
function notesSelect(constants) {

    var directive = {
        restrict: 'E',
        require: '^ngModel',
        //transclude:'element',
        //replace:true,
        scope: {
            ngModel: '='
        },
        link: link,
        template: '<select ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()"></select>'
    }

    return directive;

    function link(scope, element, attrs) {
        scope.ngModel.focusctrl = scope.ngModel.ColourType === constants.colourType.New;
        scope.ngModel.correctctrl = scope.ngModel.ColourType === constants.colourType.Correct;

        scope.setImage = function () {
            if (scope.ngModel.ColourType === 1) {
                scope.ngModel.ColourType = 0;
            }
        }

    }
}

//value.id as value.label group by value.group for value in myOptions

