angular.module('pos').directive('notesSectionTitle', notesSectionTitle);
notesSectionTitle.$inject = ['formUtility'];

function notesSectionTitle(formUtility) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            sectionForm: '=',
        },
        link: link,
        template: '<div class="ui-grid">'
        + '<div layout="row" class="ui-grid-header ui-grid-top-panel ui-grid-cell-contents">'
        + '    <span flex ng-transclude></span>'
        + '    <md-button type="button" class="md-raised" ng-click="sectionForm.$show()" ng-show="!sectionForm.$visible">'
        + '        Edit'
        + '    </md-button>'
        + '    <span ng-show="sectionForm.$visible">'
        + '        <md-button type="button" class="md-raised" ng-disabled="sectionForm.$waiting" ng-click="cancelForm($event)">'
        + '            Cancel'
        + '        </md-button>'
        + '       <md-button type="submit" class="md-primary md-raised" ng-disabled="sectionForm.$waiting">'
        + '            Save'
        + '        </md-button>'
        + '    </span>'
        + '</div>'
        + '</div>'

    }

    function link(scope, element, attrs, nullController, transclude) {
        scope.cancelForm = function cancelNotes(evt) {
            formUtility.cancelForm(evt, scope.sectionForm);
        }

        scope.sectionForm.$onshow = function () {
            //alert('shown');
            var form = angular.element(scope.sectionForm);
            $("input[type='text'], textarea", form).each(function () {
                console.log(this.name);
            });
            //attaching autocomplete
            //if (scope.item.type === "text" || scope.item.type === "textarea") {
            //    $("#" + scope.item.model.Name).textcomplete([
            //        { // tech companies
            //            match: /([^:\., ]+)$/,
            //            search: function (term, callback) {
            //                callback($.map(notesService.autoComplete, function (word) {
            //                    return word.indexOf(term) === 0 ? word : null;
            //                }));
            //            },
            //            index: 1,
            //            replace: function (word, delimiter) {
            //                if (delimiter === undefined)
            //                    delimiter = ' ';
            //                return word.slice(word.indexOf(':') + 1).trim() + delimiter;
            //            }
            //        }
            //    ]);

            //}


        }

    }
}
