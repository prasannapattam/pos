'use strict'

angular.module('pos').factory('session', session);
session.$inject = ['$rootScope', '$location', '$window', 'toastr', 'profile', 'navigation'];

function session($rootScope, $location, $window, toastr, profile, navigation) {

    var vm = {
        navigation: navigation,
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

        $rootScope.$on('$stateChangeStart', function () {
            navigation.isLoading = true;
            //checking whether user is authenticated
            if (profile.isAuthenticated === false && $location.path() !== '/login') {
                $location.path('/login');
            }
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            navigation.isLoading = false;
            //$window.document.title = $route.current.title + ' | Pediatric Ophthalmology';
        });
    };

    function logout() {
        profile.logout();
    }
};
