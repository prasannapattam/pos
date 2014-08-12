'use strict';

angular.module('pos').config(routeConfig);
routeConfig.$inject = ['$routeProvider', '$locationProvider', '$provide'];

function routeConfig($routeProvider, $locationProvider, $provide) {

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
        .when("/patient", {
            templateUrl: "/app/patient/patient.html",
            controller: "patient",
            controllerAs: "vm",
            resolve: ['patientService', function (patientService) {
                return patientService.resolve();
            }]
        })
        .otherwise({ redirectTo: "/home" });
    $locationProvider.html5Mode(true);

}