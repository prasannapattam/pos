'use strict';
angular.module('pos').controller('index', index)
index.$inject = ['$location', 'profile', 'navigation'];

function index($location, profile, navigation) {

    var menuItems = [
                        {
                            text: "Menu", url: "/",
                            items: [
                                { text: "Dashboard", url: "/" },
                                { text: "Print Queue", url: "/printqueue" },
                                { text: "Users", url: "/users" },
                                { text: "Defaults", url: "/defaults" },
                                { text: "Auto Correct", url: "/autocorrect" },
                                { text: "Configuation", url: "/configuration" },
                                { text: "Logout", url: "/logout" },
                            ]
                        }
                    ];

    var vm = {
        menuItems: menuItems,
        profile: profile,
        navigation: navigation,
        logout: logout,
        menuSelect: menuSelect
    };

    init();

    return vm;

    function init() {

    }

    function logout() {
        profile.logout();
        $location.path('/login');
    }

    function menuSelect(e) {
        $("ul.menu .k-animation-container").hide();
    }
}


