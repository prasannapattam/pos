angular.module('pos').directive('notesTitle', notesTitle);
notesTitle.$inject = ['formUtility'];

function notesTitle(formUtility) {
    return {
        restrict: 'E',
        scope: {
            sectionForm: '=',
        },
        link: link,
        template: '<div class="ui-grid">'
        + '<div layout="row" class="ui-grid-header ui-grid-top-panel ui-grid-cell-contents">'
        + '    <span flex>Testing</span>'
        + '    <md-button type="button" class="md-raised" ng-click="sectionForm.$show()" ng-show="!sectionForm.$visible">'
        + '        Edit'
        + '    </md-button>'
        + '    <span ng-show="sectionForm.$visible">'
        + '        <md-button type="button" class="md-raised" ng-disabled="sectionForm.$waiting" ng-click="cancelForm($event, sectionForm)">'
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
        scope.cancelForm = function cancelNotes(evt, form) {
            formUtility.cancelForm(evt, form);
        }

    }
}
