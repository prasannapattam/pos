'use strict';
angular.module('pos').directive('sectionHeader', sectionHeader)
sectionHeader.$inject = [];

function sectionHeader() {
    return {
        restrict: 'A',
        scope: {
            text: '@',
            cssClass: '@'
        },
        link: link,
        template: '<div class="ui-grid  border-bottom-none {{cssClass}}">'
            + '<div class="ui-grid-header ui-grid-top-panel ui-grid-cell-contents">'
            + '{{text}}'
            + '    <md-button type="button" class="md-raised" ng-click="addPatient()" ng-show="true">New Patient</md-button>'
            + '    <md-button type="button" class="md-raised" ng-click="addNotes()" ng-show="true">New Notes</md-button>'
            + '    <md-button type="button" class="md-raised" ng-click="saveNotes()" ng-show="true">Save</md-button>'
            + '    <md-button type="button" class="md-raised" ng-click="correctNotes()" ng-show="true">Correct</md-button>'
            + '    <md-button type="button" class="md-raised" ng-click="signOffNotes()" ng-show="true">SignOff</md-button>'
            + '    <md-button type="button" class="md-raised" ng-click="cancelNotes($event,this)" ng-show="true">Cancel</md-button>'
            + '</div>'
            + '</div>'
    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.addPatient = function () {

        }

        scope.addNotes = function () {

        }

        scope.saveNotes = function () {

        }

        scope.correctNotes = function () {

        }

        scope.signOffNotes = function () {

        }

        scope.cancelNotes = function () {

        }        
    }
}