'use strict';

angular.module('pos').config(routeConfig);
routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state("dashboard", {
            url: window.virtualDirectory + "/",
            title: "Dashboard",
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
            templateUrl: window.virtualDirectory + "/app/account/login.html",
            controller: "login",
            controllerAs: "vm",
        })
        .state("patient", {
            url: window.virtualDirectory + "/patient/:patientid",
            title: "Patient",
            templateUrl: window.virtualDirectory + "/app/patient/patient.html",
            controller: "patient",
            controllerAs: "vm",
            resolve: ['$stateParams', 'patientService', function ($stateParams, patientService) {
                return patientService.resolve($stateParams.patientid);
            }]
        })
        .state("patient.portal", {
            url: window.virtualDirectory + "/portal",
            title: "Patient",
            templateUrl: window.virtualDirectory + "/app/patient/portal.html",
            controller: "portal",
            controllerAs: "vm",
        })
        .state("patient.demographics", {
            url: window.virtualDirectory + "/demographics",
            title: "Patient",
            templateUrl: window.virtualDirectory + "/app/patient/demographics.html",
            controller: "demographics",
            controllerAs: "vm",
        })
        .state("printqueue", {
            url: window.virtualDirectory + "/printqueue",
            title: "Print Queue",
            templateUrl: window.virtualDirectory + "/app/print/printqueue.html",
            controller: "printqueue",
            controllerAs: "vm",
            resolve: ['printService', function (printService) {
                return printService.fetchQueue();
            }]
        })

    //.when(window.virtualDirectory + "/notes/:notestype/:patientid/:examid?", {
        //    title: "Notes",
        //    templateUrl: window.virtualDirectory + "/app/notes/notestest.html",
        //    controller: "notestest",
        //    controllerAs: "vm",
        //    resolve: {
        //        lookupsresolve: ['lookupService', function (lookupService) {
        //                            return lookupService.resolve();
        //                        }],
        //        notesresolve:  ['notestestService', function (notestestService) {
        //                            return notestestService.resolve();
        //                        }]
        //    }
               
        //})
        //.otherwise({ redirectTo: window.virtualDirectory + "/login" });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', '/')

}

//http://www.ng-newsletter.com/posts/angular-ui-router.html