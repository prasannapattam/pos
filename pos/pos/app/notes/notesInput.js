'use strict'

angular.module('pos').directive('notesInput', notesInput);
notesInput.$inject = [];
function notesInput() {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            inputList: '=',
        },
        link: link,
        template: '<span ng-repeat="(name, model) in inputList" editable-text="model.Value" e-name="{{model.Name}}" e-class="medium" e-ng-class="{focusctrl: model.focusctrl, correctctrl: model.correctctrl}" ng-transclude></span>'
}

    return directive;

    function link(scope, element, attrs) {
        
        //notesUtility.notesDirectivesLink(scope, attrs.ngModel);
        //template: '<input type="text" ng-repeat="(name, val) in inputList" ng-model="val.Value">'
    }
}
