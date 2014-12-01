'use strict';
angular.module('pos').controller('user', user)
user.$inject = ['$window', '$scope', 'userService', 'utility'];

function user($window, $scope, userService, utility) {

    var vm = {
        model: [],
        selectedUser: {},
        getPhotoUrl: utility.getPhotoUrl,
        listHeight: '0px',
        selectUser: selectUser
    }

    init();

    return vm;

    function init(){
        vm.model = userService.model;
        resetUserSelection();
        resizeUserList();

        angular.element($window).bind('resize', function () {
            resizeUserList();
            $scope.$apply('vm.listHeight');
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeUserList() {
        vm.listHeight = utility.getGridHeight('user-list');
    }

    function resetUserSelection() {
        for (var counter = 0; counter < vm.model.length; counter++) {
            vm.model[counter].selected = false;
        }
    }

    function selectUser(item) {
        resetUserSelection();
        item.selected = true;
        vm.selectedUser = item;
    }
}