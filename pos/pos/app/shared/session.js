﻿'use strict'

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
            if (navigation.hideHeader === true) //during development
                $window.document.title = navigation.appTitle;
            else
                $window.document.title = toState.title + ' | ' + navigation.appTitle;
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
                vm.lookups.HxFrom.push({ FieldDescription: "", FieldName: "HxFrom", FieldValue: "Other" });
                //adding the boolean options
                vm.lookups.BOOL = [{ FieldName: "BOOL", FieldDescription: true, FieldValue: "Yes" },
                                    { FieldName: "BOOL", FieldDescription: false, FieldValue: "No" }];
            });
    }

};

