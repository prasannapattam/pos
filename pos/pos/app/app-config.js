﻿'use strict';

angular.module('pos').config(appConfig);
appConfig.$inject = ['$httpProvider'];

function appConfig($routeProvider, $locationProvider, $provide, $httpProvider) {

    $routeProvider
        .when("/home", {
            templateUrl: "/app/home/home.html",
            controller: "home",
            controllerAs: "vm",
        })
        .when("/contact", {
            templateUrl: "/app/contact/contact.html",
            controller: "contact",
            controllerAs: "vm"
        })
        .otherwise({ redirectTo: "/home" });
    $locationProvider.html5Mode(true);

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('WebAPIInterceptor');

}

