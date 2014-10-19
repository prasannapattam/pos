'use strict';
angular.module('pos').factory('navigation', navigation)
navigation.$inject = ['utility', 'constants', '$state'];

function navigation(utility, constants, $state) {

    var tab = function (tabs, title, hash, icon) {
        var self = this;

        self.tabs = tabs;
        self.title = title;
        self.hash = hash;
        self.firstTab = tabs.length == 0;
        self.active = true;
        self.iconUrl = utility.iconPath(icon);

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
        setHomeTab: setHomeTab,
        addTab: addTab,
        setCurrentTitle: setCurrentTitle,
        clear: clear,
        gotoPatient: gotoPatient
    };

    init();

    return vm;

    function init() {
        //vm.tabs.push(new tab(tabs, 'Prasanna Pattam', '#home'))

        addTab('Dashboard', 'dashboard', constants.iconTypes.dashboard)
    }

    function setHomeTab(title, hash, active) {

        var homeTab = vm.tabs[0];

        homeTab.title = title;
        homeTab.hash = window.virtualDirectory + hash;
        //router.activeInstruction().config.title = title();

        if (active) {
            homeTab.active = true;
            var tabs = vm.tabs;
            for (index = 1; index < tabs.length; index++) {
                tabs[index].active = false;
            }
        }

    }

    function setCurrentTitle(title) {
        var tabs = vm.tabs;
        for (index = 1; index < tabs.length; index++) {
            if (tabs[index].active === true)
                tabs[index].title = title;
        }
    }

    function activateTab(tab) {
        if (!tab.active) {
            var tabs = tab.tabs;
            for (index = 0; index < tabs.length; index++) {
                tabs[index].active = false;
            }
            tab.active = true;

            var hash = tab.hash;
            //$state.go(hash);
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

    function addTab(title, hash, icon) {
        //checking if the tab is already present 
        var tabexists = false;
        hash = window.virtualDirectory + hash;
        for (index = 0; index < vm.tabs.length; index++) {
            if (vm.tabs[index].hash === hash) {
                vm.tabs[index].active = true;
                tabexists = true;
            }
            else {
                vm.tabs[index].active = false;
            }
        }

        if (tabexists === false)
            vm.tabs.push(new tab(vm.tabs, title, hash, icon))
    }

    function clear() {
        vm.tabs.remove(function (item) {
            return item.firstTab !== true;
        })
    }

    function gotoPatient(patientId, patientName) {
        vm.addTab(patientName, 'patient.portal ({ patientid: ' + patientId + '})', constants.iconTypes.patient);
        $state.go("patient.portal", { patientid: patientId })
    }
}


