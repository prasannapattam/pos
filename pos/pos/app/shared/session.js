'use strict'

angular.module('pos').factory('session', session);
session.$inject = ['$rootScope', '$state', '$window', '$http', 'toastr', 'profile', 'navigation'];

function session($rootScope, $state, $window, $http, toastr, profile, navigation) {

    var vm = {
        navigation: navigation,
        profile: profile,
        initialize: initialize,
        logout: logout,
        lookups: []
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';
        $rootScope.session = vm;
        $rootScope.profile = profile;
        $rootScope.navigation = navigation;

        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            navigation.isLoading = true;
            //checking whether user is authenticated
            $window.document.title = toState.title + ' | Pediatric Ophthalmology';
            if (profile.isAuthenticated === false && toState.name !== 'login') {
                evt.preventDefault();
                $state.go('login');
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
            navigation.isLoading = false;
            navigation.addOrActivateTab(toState, toParams);
        });

        $rootScope.$on('$viewContentLoaded', function () {
            navigation.setLeftMenu();
        });
        populateLookups();
    };

    function logout() {
        profile.logout();
    }

    function populateLookups() {
        return $http.get("/api/lookup")
            .success(function (data) {
                vm.lookups = data
            });
    }

};

