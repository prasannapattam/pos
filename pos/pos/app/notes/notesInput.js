'use strict'

angular.module('pos').directive('notesInput', notesInput);
notesInput.$inject = [];

angular.module('pos').directive('notesInputItem', notesInputItem);
notesInputItem.$inject = ['$compile'];

function notesInput() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            inputList: '=',
        },
        link: link,
        template: '<notes-input-item ng-repeat="item in inputList" item="item">'
                + '<span ng-if="$first" ng-transclude></span>'
                + '</notes-input-item>'
    }

    function link(scope, element, attrs) {
        
        //notesUtility.notesDirectivesLink(scope, attrs.ngModel);
        //template: '<input type="text" ng-repeat="(name, val) in inputList" ng-model="val.Value">'
    }
}

function notesInputItem($compile) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: '=',
        },
        link: link,
        template: getTemplate()
    }

    function getTemplate() {
        var item = { type: 'hello' };
        var editableSpan = '<span'

        switch (item.type) {
            case "textarea":
                editableSpan += ' editable-textarea="item.model.Value" e-rows="3"'
                break;
            default:
                editableSpan += ' editable-text="item.model.Value"'
        }

        //                    <a href="#" title="Click to edit" editable-textarea="vm.patientModel.Occupation" e-rows="3" onaftersave="vm.savePatient()">{{ vm.patientModel.Occupation | blankValue  }}</a>
        editableSpan += ' e-name="{{item.model.Name}}" e-ng-class="{focusctrl:item.model.focusctrl, correctctrl: item.model.correctctrl}" ng-transclude></span>'
        return editableSpan;
    }

    function link(scope, element, attrs, linker) {

        //element.append(getTemplate(scope.item));
        //$compile(element.contents())(scope);

        //notesUtility.notesDirectivesLink(scope, attrs.ngModel);
        //template: '<input type="text" ng-repeat="(name, val) in inputList" ng-model="val.Value">'
    }
}


