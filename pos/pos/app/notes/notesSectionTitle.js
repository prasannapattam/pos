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
    }
}
