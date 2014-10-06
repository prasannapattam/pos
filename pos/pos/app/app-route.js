'use strict';

angular.module('pos').config(routeConfig);
routeConfig.$inject = ['$routeProvider', '$locationProvider', '$provide'];

function routeConfig($routeProvider, $locationProvider, $provide) {

    $routeProvider
        .when("/", {
            title: "Patients",
            templateUrl: "/app/dashboard/dashboard.html",
            controller: "dashboard",
            controllerAs: "vm",
        })
        .when("/login", {
            title: "Login",
            templateUrl: "/app/account/login.html",
            controller: "login",
            controllerAs: "vm",
        })
        .when("/logout", {
            title: "Logout",
            templateUrl: "/app/account/login.html",
            controller: "logout",
            controllerAs: "vm",
        })
        .when("/patient/:patientid", {
            title: "Patients",
            templateUrl: "/app/patient/patient.html",
            controller: "patient",
            controllerAs: "vm",
            resolve: ['patientService', function (patientService) {
                return patientService.resolve();
            }]
        })
        .when("/notes/:notestype/:patientid/:examid?", {
            title: "Notes",
            templateUrl: "/app/notes/notestest.html",
            controller: "notestest",
            controllerAs: "vm",
            resolve: {
                lookupsresolve: ['lookupService', function (lookupService) {
                                    return lookupService.resolve();
                                }],
                notesresolve:  ['notestestService', function (notestestService) {
                                    return notestestService.resolve();
                                }]
            }
               
        })
        .otherwise({ redirectTo: "/login" });
    $locationProvider.html5Mode(true);

}