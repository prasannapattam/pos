'use strict'

angular.module('pos').directive('notesInput', notesInput);
notesInput.$inject = [];

angular.module('pos').directive('notesInputItem', notesInputItem);
notesInputItem.$inject = ['$compile', 'session'];

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
}

function notesInputItem($compile, session) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            item: '=',
        },
        link: link
    }

    function getTemplate(item) {
        var editableSpan = '<span'

        switch (item.type) {
            case "textarea":
                editableSpan += ' editable-textarea="item.model.Value" e-rows="3"'
                break;
            case "dropdown":
                item.model.selectoptions = session.lookups[item.model.LookUpFieldName]
                editableSpan += ' editable-select="item.model.Value" e-ng-options="lookup.FieldDescription as lookup.FieldValue for lookup in item.model.selectoptions"'
                break;
            default:
                editableSpan += ' editable-text="item.model.Value"'
        }

        editableSpan += ' e-name="{{item.model.Name}}" e-ng-class="{focusctrl:item.model.focusctrl, correctctrl: item.model.correctctrl}"></span>'
        return editableSpan;
    }

    function link(scope, element, attrs, nullController, transclude) {

        var elementHtml = getTemplate(scope.item);
        element.html(elementHtml); 
        $compile(element.contents())(scope);
        transclude(scope.$parent, function (clone, scope) {
            element.children().append(clone);
        });

    }
}


