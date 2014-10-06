'use strict';

angular.module('pos').controller('logout', logout);
logout.$inject = ['$location', 'profile'];

function logout($location, profile) {

    var vm = {}

    init();

    return vm;

    function init() {
        profile.logout();
        $location.path('/login');
    }

}

