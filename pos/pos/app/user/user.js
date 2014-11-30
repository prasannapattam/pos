'use strict';
angular.module('pos').controller('user', user)
user.$inject = ['$window', '$scope', 'userService', 'utility'];

function user($window, $scope, userService, utility) {

    var vm = {
        model: {},
        getPhotoUrl: utility.getPhotoUrl,
        listHeight: '0px'
    }

    init();

    return vm;

    function init(){
        vm.model = userService.model;
        resizeUserList();

        angular.element($window).bind('resize', function () {
            resizeUserList();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeUserList() {
        vm.listHeight = utility.getGridHeight('user-list');
    }
}