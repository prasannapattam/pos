'use strict'

angular.module('pos').directive('notesText', notesText);
angular.module('pos').directive('notesTextarea', notesTextarea);
angular.module('pos').directive('notesSelect', notesSelect);
angular.module('pos').directive('notesDatepicker', notesDatepicker);

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
        template: '<input ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()" />'
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

notesTextarea.$inject = ['constants'];
function notesTextarea(constants) {

    var directive = {
        restrict: 'E',
        require: '^ngModel',
        //transclude:'element',
        //replace:true,
        scope: {
            ngModel: '='
        },
        link: link,
        template: '<textarea ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()"></textarea>'
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

notesSelect.$inject = ['constants', 'session'];
function notesSelect(constants, session) {

    var directive = {
        restrict: 'E',
        require: '^ngModel',
        //transclude:'element',
        //replace:true,
        scope: {
            ngModel: '='
        },
        link: link,
        template: '<select ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()" ng-options="lookup.FieldDescription as lookup.FieldValue for lookup in ngModel.selectoptions"><option></option></select>'
    }

    return directive;

    function link(scope, element, attrs) {
        scope.ngModel.focusctrl = scope.ngModel.ColourType === constants.colourType.New;
        scope.ngModel.correctctrl = scope.ngModel.ColourType === constants.colourType.Correct;

        scope.ngModel.selectoptions = session.lookups[scope.ngModel.LookUpFieldName]

        scope.setImage = function () {
            if (scope.ngModel.ColourType === 1) {
                scope.ngModel.ColourType = 0;
            }
        }

    }
}

notesDatepicker.$inject = ['constants'];
function notesDatepicker(constants) {

    var directive = {
        restrict: 'E',
        require: '^ngModel',
        //transclude:'element',
        //replace:true,
        scope: {
            ngModel: '='
        },
        link: link,
        template: '<input kendo-date-picker ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()" />'
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


