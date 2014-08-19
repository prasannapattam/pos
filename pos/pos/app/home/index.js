'use strict';
angular.module('pos').controller('index', index)
index.$inject = ['$location', 'profile'];

function index($location, profile) {

    var vm = {
        model: {},
        profile: profile,
        logout: logout
    };

    init();

    return vm;

    function init() {

    }

    function logout() {
        profile.logout();
        $location.path('/login');
    }

}


