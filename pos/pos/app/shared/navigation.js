'use strict';
angular.module('pos').factory('navigation', navigation)
navigation.$inject = [];

function navigation() {

    var tab = function (tabs, title, hash) {
        var self = this;

        self.tabs = tabs;
        self.title = title;
        self.hash = hash;
        self.firstTab = tabs.length == 0;
        //self.href = location.href;
        self.active = true;

        if (tabs.length > 5) {
            var item = tabs[1];
            tabs.remove(item);
        }
    };

    var tabs = [];

    var vm = {
        isLoading: true,
        tabs: tabs,
        activateTab: activateTab,
        removeTab: removeTab,
        setHomeTab: setHomeTab,
        addTab: addTab,
        setCurrentTitle: setCurrentTitle,
        clear: clear
    };

    init();

    return vm;

    function init() {
        vm.tabs.push(new tab(tabs, 'Prasanna Pattam', '#home'))

        addTab('Prasanna Login', '/login')
        addTab('Prasanna Dashboard', '/')
        addTab('Prasanna Patient', '/patient')
        addTab('Prasanna Dashboard', '/')
    }

    function setHomeTab(title, hash, active) {

        var homeTab = vm.tabs[0];

        homeTab.title = title;
        homeTab.hash = hash;
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
            //router.navigate(hash);
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

    function addTab(title, hash) {
        //checking if the tab is already present 
        var tabexists = false;
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
            vm.tabs.push(new tab(vm.tabs, title, hash))
    }

    function clear() {
        vm.tabs.remove(function (item) {
            return item.firstTab !== true;
        })
    }
}


