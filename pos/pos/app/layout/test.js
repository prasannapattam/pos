'use strict';
angular.module('pos').controller('test', test)
test.$inject = ['$scope', '$mdDialog'];

function test($scope, $mdDialog) {

    var vm = {
        message: "This is testing",
        cancel: cancel,
        cancelYes: cancelYes,
        cancelNo: cancelNo,
        kendoOpen: kendoOpen
    };


    init();

    angular.extend(this, vm);

    function init() {
    }

    function cancel(ev) {
        //$scope.confirmDialog.open().center();
        var confirm = $mdDialog.confirm()
          .title('Do you want to cancel and loose your changes?')
          .content('Clicking yes will loose your changes')
          .ariaLabel('Lucky day')
          .ok('Yes')
          .cancel('No')
          .targetEvent(ev)

        $mdDialog.show(confirm).then(function () {
            $scope.edform.$cancel()
        }, function () {
            //do nothing
        });
    }

    function kendoOpen() {
        $scope.confirmDialog.open().center();
    }

    function cancelYes(){
        $scope.confirmDialog.close();
        $scope.edform.$cancel()
    }
    function cancelNo(){
        $scope.confirmDialog.close();
    }
}


