'use strict';
angular.module('pos').controller('test', test)
test.$inject = ['$scope'];

function test($scope) {

    var vm = {
        message: "This is testing",
        cancel: cancel,
        cancelYes: cancelYes,
        cancelNo: cancelNo
    };


    init();

    angular.extend(this, vm);

    function init() {
    }

    function cancel() {
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


