'use strict';

var app = angular.module('AngularKendoBootstrapApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/home", {
                controller: "home",
                templateUrl: "/app/pages/home/home.html"
            })
        .when("/contact", {
            controller: "contact",
            templateUrl: "/app/pages/contact/contact.html"
        })
         .when("/login", {
             controller: "login",
             templateUrl: "/app/pages/login/login.html"
         })
         .when("/patient", {
             controller: "patient",
             templateUrl: "/app/pages/patient/patient.html"
         })
         .when("/notes", {
             controller: "notes",
             templateUrl: "/app/pages/notes/notes.html"
         })
         .when("/user", {
             controller: "user",
             templateUrl: "/app/pages/user/user.html"
         })
         .when("/print", {
             controller: "print",
             templateUrl: "/app/pages/print/print.html"
         })
           .when("/compat", {
               controller: "compat",
               templateUrl: "/app/pages/compat/compat.html"
           })
        .otherwise({ redirectTo: "/home" });
    $locationProvider.html5Mode(true);
});