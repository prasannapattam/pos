'use strict'

angular.module('pos').directive('notesText', notesText);
angular.module('pos').directive('notesTextarea', notesTextarea);
angular.module('pos').directive('notesSelect', notesSelect);
angular.module('pos').directive('notesDatepicker', notesDatepicker);
angular.module('pos').factory('notesDatepicker', notesDatepicker);

notesText.$inject = ['notesUtility'];
function notesText(notesUtility) {

    var directive = {
        restrict: 'E',
        require: '^ngModel',
        transclude: true,
        scope: {
            ngModel: '=',
        },
        link: link,
        template: '<span editable-text="ngModel.Value" e-name="{{name}}" e-class="medium" e-ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" e-ng-focus="clearColourType()" ng-transclude></span>'
}

//        template: '<input ng-model="ngModel.Value" ng-class="{focusctrl: ngModel.focusctrl, correctctrl: ngModel.correctctrl}" ng-focus="clearColourType()" />'
//            <span editable-text="vm.model.SpcWr1OD.Value" e-name="SpcWr1OD" e-class="medium" e-maxlength="20">{{ vm.model.SpcWr1OD.Value }}</span>

    return directive;

    function link(scope, element, attrs) {
        notesUtility.notesDirectivesLink(scope, attrs.ngModel);
    }
}

notesTextarea.$inject = ['notesUtility'];
function notesTextarea(notesUtility) {

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
        notesUtility.notesDirectivesLink(scope, attrs.ngModel);
    }
}

notesSelect.$inject = ['notesUtility', 'session'];
function notesSelect(notesUtility, session) {

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
        scope.ngModel.selectoptions = session.lookups[scope.ngModel.LookUpFieldName]
        notesUtility.notesDirectivesLink(scope, attrs.ngModel);
    }
}

notesDatepicker.$inject = ['notesUtility'];
function notesDatepicker(notesUtility) {

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
        notesUtility.notesDirectivesLink(scope, attrs.ngModel);
    }
}


