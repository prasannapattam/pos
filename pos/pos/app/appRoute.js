'use strict';

angular.module('pos').config(appRoute);
appRoute.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'constants'];

function appRoute($stateProvider, $urlRouterProvider, $locationProvider, constants) {

    $stateProvider
        .state("dashboard", {
            url: window.virtualDirectory,
            title: "Dashboard",
            icon: constants.iconTypes.dashboard,
            templateUrl: window.virtualDirectory + "/app/dashboard/dashboard.html",
            controller: "dashboard",
            controllerAs: "vm",
            resolve: ['dashboardService', function (dashboardService) {
                return dashboardService.resolve();
            }]
        })
        .state("login", {
            url: window.virtualDirectory + "/login",
            title: "Login",
            icon: "",
            templateUrl: window.virtualDirectory + "/app/account/login.html",
            controller: "login",
            controllerAs: "vm",
        })
        .state("patient", {
            url: window.virtualDirectory + "/patient/:patientid",
            title: "Patient",
            icon: constants.iconTypes.patient,
            templateUrl: window.virtualDirectory + "/app/patient/patient.html",
            controller: "patient",
            controllerAs: "vm",
            resolve: ['$stateParams', 'patientService', function ($stateParams, patientService) {
                return patientService.resolve($stateParams.patientid);
            }]
        })
        .state("patient.portal", {
            url: "/portal",
            title: "Patient",
            icon: constants.iconTypes.patient,
            parentStateName: "patient",
            templateUrl: window.virtualDirectory + "/app/patient/portal.html",
            controller: "portal",
            controllerAs: "vm",
        })
        .state("patient.demographics", {
            url: "/demographics",
            title: "Patient",
            icon: constants.iconTypes.patient,
            parentStateName: "patient",
            templateUrl: window.virtualDirectory + "/app/patient/demographics.html",
            controller: "demographics",
            controllerAs: "vm",
        })
        .state("patient.history", {
            url: "/encounterhistory",
            title: "Patient",
            icon: constants.iconTypes.patient,
            parentStateName: "patient",
            templateUrl: window.virtualDirectory + "/app/patient/encounterHistory.html",
            controller: "encounterHistory",
            controllerAs: "vm",
        })
        .state("patient.notes", {
            url: "/notes/:notesid",
            title: "Patient",
            icon: constants.iconTypes.patient,
            parentStateName: "patient",
            templateUrl: window.virtualDirectory + "/app/notes/notes.html",
            controller: "notes",
            controllerAs: "vm",
            resolve: ['$stateParams', 'notesService', function ($stateParams, notesService ) {
                return notesService.resolve($stateParams.patientid, $stateParams.notesid);
            }]
        })
        .state("printqueue", {
            url: window.virtualDirectory + "/printqueue",
            title: "Print Queue",
            icon: constants.iconTypes.printQueue,
            templateUrl: window.virtualDirectory + "/app/print/printqueue.html",
            controller: "printqueue",
            controllerAs: "vm",
            resolve: ['printService', function (printService) {
                return printService.fetchQueue();
            }]
        })
        .state("user", {
            url: window.virtualDirectory + "/user",
            title: "Users",
            icon: constants.iconTypes.user,
            templateUrl: window.virtualDirectory + "/app/user/user.html",
            controller: "user",
            controllerAs: "vm",
            resolve: ['userService', function (userService) {
                return userService.fetch();
            }]
        })

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', '/')
    $urlRouterProvider.when(window.virtualDirectory + '/', window.virtualDirectory);

}
