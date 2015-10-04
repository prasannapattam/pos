angular.module('pos').directive('notesSectionTitle', notesSectionTitle);
notesSectionTitle.$inject = ['formUtility', 'notesUtility', 'utility', '$mdDialog'];

function notesSectionTitle(formUtility, notesUtility, utility, $mdDialog) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            sectionForm: '=',
            showHistory: '@',
            title: '@',
            historyType: '@',
            historyModel: '='
        },
        link: link,
        template: '<div class="ui-grid">'
        + '<div layout="row" class="ui-grid-header ui-grid-top-panel ui-grid-cell-contents">'
        + '    <span flex ng-transclude></span>'
        + '    <md-button type="button" class="md-raised" ng-click="acceptDefaults()">Accept Defaults</md-button>&nbsp;&nbsp;&nbsp;'
        + '    <md-button type="button" class="md-raised" ng-click="sectionForm.$show()" ng-show="!sectionForm.$visible">Edit</md-button>'
        + '    <span ng-show="sectionForm.$visible">'
        + '        <md-button type="button" class="md-raised" ng-disabled="sectionForm.$waiting" ng-click="cancelForm($event)">'
        + '            Cancel'
        + '        </md-button>'
        + '       <md-button type="submit" class="md-primary md-raised" ng-disabled="sectionForm.$waiting">'
        + '            Save'
        + '        </md-button>'
        + '    </span>'
        + '    <md-button aria-label="" class="md-raised" ng-show="{{showHistory}}" ng-click="displayHistory(historyModel,historyType,title)">'
        + '           <img ng-src="{{geticonPath()}}" title="{{title}}" class="centered" />'
        + '    </md-button>'
        + '</div>'
        + '</div>'

    }

    function link(scope, element, attrs, nullController, transclude) {
        scope.cancelForm = function (evt) {
            //formUtility.cancelForm(evt, scope.sectionForm);
            scope.sectionForm.$cancel()
        }

        scope.acceptDefaults = function () {
            for (var counter = 0; counter < scope.sectionForm.models.length; counter++) {
                notesUtility.clearColourType(scope.sectionForm.models[counter]);
            }
        }

        scope.geticonPath = function () {
            return utility.iconPath("history.png");
        }

        scope.displayHistory = function (historyModel, historyType, title) {

            $mdDialog.show({
                controller: history,
                controllerAs: "vm",
                clickOutsideToClose: true,
                templateUrl: utility.virtualDirectory + '/app/notes/history.html',
                locals: { $mdDialog: $mdDialog, historyModel: historyModel, historyType: historyType, title: title }
            });
        }
    }
}
