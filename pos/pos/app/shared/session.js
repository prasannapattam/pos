'use strict'

angular.module('pos').factory('session', session);
session.$inject = ['$rootScope', '$location', 'toastr', 'profile'];

function session($rootScope, $location, toastr, profile) {

    var vm = {
        initialize: initialize,
        logout: logout
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.isLoading = true;
            //checking whether user is authenticated
            if (profile.isAuthenticated === false && $location.path() !== '/login') {
                $location.path('/login');
            }
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.isLoading = false;
        });

        //setting logout
        //$rootscope.logout 

    };

    function logout() {
        profile.logout();
    }
};
