﻿angular.module('pos').directive('notesInputItem', notesInputItem);
notesInputItem.$inject = ['$compile', 'session', 'constants', 'notesUtility', 'notesService'];

function notesInputItem($compile, session, constants, notesUtility, notesService) {
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

        if (item.cssClass !== undefined) {
            editableSpan += ' e-class="{{item.cssClass}}"';
        }

        editableSpan += ' e-id="{{item.model.Name}}" e-name="{{item.model.Name}}" e-ng-class="{focusctrl:item.model.focusctrl, correctctrl: item.model.correctctrl}" e-ng-focus="itemfocus()"></span>'
        return editableSpan;
    }

    function link(scope, element, attrs, nullController, transclude) {

        scope.itemfocus = function () {
            //clearing the colours
            notesUtility.clearColourType(scope.item.model);

            //attaching autocomplete
            if (scope.item.type === "text" || scope.item.type === "textarea") {
                var textelement = $('#' + scope.item.model.Name);
                //attaching the textcomplete only one time using the textcomplete-attached attribute
                if (textelement.attr("textcomplete-attached") === undefined) { 
                    textelement.textcomplete([
                    { // tech companies
                        match: /([^:\., ]+)$/,
                        search: function (term, callback) {
                            callback($.map(notesService.autoComplete, function (word) {
                                return word.indexOf(term) === 0 ? word : null;
                            }));
                        },
                        index: 1,
                        replace: function (word, delimiter) {
                            if (delimiter === undefined)
                                delimiter = ' ';
                            return word.slice(word.indexOf(':') + 1).trim() + delimiter;
                        }
                    }
                    ]);
                    textelement.attr("textcomplete-attached", "true");
                }
            }


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

