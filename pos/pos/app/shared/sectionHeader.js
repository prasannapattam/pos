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
        template: '<div class="ui-grid {{cssClass}}">' +
                        '<div class="ui-grid-header ui-grid-top-panel ui-grid-cell-contents">' +
                            '{{text}}' +
                        '</div>' +
                    '</div>'
    };
}