'use strict';
angular.module('pos').factory('navigation', navigation)
navigation.$inject = ['$state', 'utility', 'constants'];

function navigation($state, utility, constants) {

    var tab = function (tabs, title, icon, stateName, params) {
        var self = this;

        self.tabs = tabs;
        self.title = title;
        self.firstTab = tabs.length == 0;
        self.active = true;
        self.iconUrl = utility.iconPath(icon);
        self.stateName = stateName;
        self.params = params;
        self.hash = $state.href(stateName, params);

        if (tabs.length > 3) {
            tabs.splice(1, 1);
        }
    };

    var tabs = [];

    var vm = {
        isLoading: true,
        tabs: tabs,
        iconTypes: constants.iconTypes,
        activateTab: activateTab,
        removeTab: removeTab,
        addTab: addTab,
        gotoPatient: gotoPatient,
        addMenuTab: addMenuTab,
        setCurrent: setCurrent
    };

    init();

    return vm;

    function init() {
        addTab('Dashboard', constants.iconTypes.dashboard, 'dashboard', {})
    }

    function activateTab(tab) {
        if (!tab.active) {
            var tabs = tab.tabs;
            for (index = 0; index < tabs.length; index++) {
                tabs[index].active = false;
            }
            tab.active = true;

            $state.go(tab.stateName, tab.params);
        }
    };

    function removeTab(tab) {
        var tabs = tab.tabs;
        if (tab.active) {
            for (index = 0; index < tabs.length; index++) {
                if (tabs[index].active) {
                    activateTab(tab.tabs[index - 1]);
                    break;
                }
            }
        }

        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);
    };

    function addTab(title, icon, stateName, params) {
        //checking if the tab is already present 
        if (!checkAndActivateTab(stateName, params))
            vm.tabs.push(new tab(vm.tabs, title, icon, stateName, params))
    }

    function gotoPatient(patientId, patientName) {
        vm.addTab(patientName, constants.iconTypes.patient, 'patient.portal', { patientid: patientId });
        $state.go("patient.portal", { patientid: patientId })
    }

    function addMenuTab(title) {
        var icon;
        var stateName;
        switch (title) {
            case "Print Queue":
                icon = constants.iconTypes.printQueue;
                stateName = "printqueue";
                params = {};
                break;
            default:
                return;
        }

        vm.addTab(title, icon, stateName, params);
    }

    function setCurrent(state, params) {
        checkAndActivateTab(state.name, params);
    }

    function checkAndActivateTab(stateName, params){
        var tabexists = false;
        var hash = $state.href(stateName, params);
        for (index = 0; index < vm.tabs.length; index++) {
            if (vm.tabs[index].hash === hash) {
                vm.tabs[index].active = true;
                tabexists = true;
            }
            else {
                vm.tabs[index].active = false;
            }
        }

        return tabexists;
    }
}


