angular.module('pos').directive('notesInputItem', notesInputItem);
notesInputItem.$inject = ['$compile', 'session', 'constants', 'notesUtility'];

function notesInputItem($compile, session, constants, notesUtility) {
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
            case "date":
                editableSpan += ' editable-bsdate="item.model.Value"'
                break;
            default:
                editableSpan += ' editable-text="item.model.Value"'
        }

        editableSpan += ' e-id="{{item.model.Name}}" e-name="{{item.model.Name}}" e-ng-class="{focusctrl:item.model.focusctrl, correctctrl: item.model.correctctrl}" e-ng-focus="clearColourType()"></span>'
        return editableSpan;
    }

    function link(scope, element, attrs, nullController, transclude) {

        scope.clearColourType = function () {
            notesUtility.clearColourType(scope.item.model);
        }

        //setting the colours
        notesUtility.setInputColours(scope.item.model);

        var elementHtml = getTemplate(scope.item); //based on the item type creating the control
        element.html(elementHtml);
        $compile(element.contents())(scope);
        transclude(scope.$parent, function (clone, scope) {
            element.children().append(clone);
        });
    }
}

