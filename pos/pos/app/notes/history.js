'use strict';

angular.module('pos').controller('history', history);
history.$inject = ['$scope', 'constants', '$mdDialog', 'historyModel', 'historyType', 'title'];

function history($scope, constants, $mdDialog, historyModel, historyType, title) {
    var vm = {
        model: {},
        init: init,
        closeDialog: closeDialog
    };

    init();

    return vm;

    function init() {

        vm.model.historyModel = historyModel;
        vm.model.title = title;

        vm.model.showdistHistory = false;
        vm.model.showrfxHistory = false;
        vm.model.showocmHistory = false;
        vm.model.showbinoHistory = false;
        vm.model.showsumHistory = false;
        vm.model.showcchHistory = false;


        switch (historyType) {
            case constants.historyType.distHistory:
                {
                    vm.model.showdistHistory = true;
                    break;
                }
            case constants.historyType.rfxHistory:
                {
                    vm.model.showrfxHistory = true;
                    break;
                }
            case constants.historyType.ocmHistory:
                {
                    vm.model.showocmHistory = true;
                    break;
                }
            case constants.historyType.binoHistory:
                {
                    vm.model.showbinoHistory = true;
                    break;
                }
            case constants.historyType.sumHistory:
                {
                    vm.model.showsumHistory = true;
                    break;
                }
            case constants.historyType.cchHistory:
                {
                    vm.model.showcchHistory = true;
                    break;
                }
            default:
                break;
        }
    }

    function closeDialog()
    {
        $mdDialog.hide();
    }


}

