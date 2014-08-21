'use strict'

angular.module('pos').factory('session', session);
session.$inject = ['$rootScope', '$location', 'toastr', 'profile'];

function session($rootScope, $location, toastr, profile) {

    var vm = {
        isLoading: true,
        profile: profile,
        initialize: initialize,
        logout: logout
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';
        $rootScope.session = vm;
        $rootScope.profile = profile;

        $rootScope.$on('$routeChangeStart', function () {
            vm.isLoading = true;
            //checking whether user is authenticated
            if (profile.isAuthenticated === false && $location.path() !== '/login') {
                $location.path('/login');
            }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            vm.isLoading = false;
        });
    };

    function logout() {
        profile.logout();
    }
};
