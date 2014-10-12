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
            title: "Patients",
            templateUrl: window.virtualDirectory + "/app/patient/patient.html",
            controller: "patient",
            controllerAs: "vm",
            resolve: ['$stateParams', 'patientService', function ($stateParams, patientService) {
                return patientService.resolve($stateParams.patientid);
            }]
        })
        .state("patient.portal", {
            url: window.virtualDirectory + "/portal",
            templateUrl: window.virtualDirectory + "/app/patient/portal.html",
            controller: "portal",
            controllerAs: "vm",
        })
        .state("patient.demographics", {
            url: window.virtualDirectory + "/demographics",
            templateUrl: window.virtualDirectory + "/app/patient/demographics.html",
            controller: "demographics",
            controllerAs: "vm",
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