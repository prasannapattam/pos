'use strict';

angular.module('pos').config(appRouteConfig);
appRouteConfig.$inject = ['$routeProvider', '$locationProvider'];

function appRouteConfig($routeProvider, $locationProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "/app/home/home.html",
            controller: "home",
            controllerAs: "vm",
        })
        .when("/contact", {
            templateUrl: "/app/contact/contact.html",
            controller: "contact",
            controllerAs: "vm",
            resolve: ['contactService', function (contactService) {
                return contactService.resolve();
            }]

        })
        .otherwise({ redirectTo: "/home" });

    //setting the html5 mode routing
    $locationProvider.html5Mode(true);
}

