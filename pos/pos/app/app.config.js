'use strict';

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/home", {
            controller: "home",
            templateUrl: "/app/home/home.html"
        })
        .when("/contact", {
            controller: "contact",
            templateUrl: "/app/contact/contact.html"
        })
         .when("/login", {
             controller: "login",
             templateUrl: "/app/login/login.html"
         })
         .when("/patient", {
             controller: "patient",
             templateUrl: "/app/patient/patient.html"
         })
         .when("/notes", {
             controller: "notes",
             templateUrl: "/app/notes/notes.html"
         })
         .when("/user", {
             controller: "user",
             templateUrl: "/app/user/user.html"
         })
         .when("/print", {
             controller: "print",
             templateUrl: "/app/print/print.html"
         })
           .when("/compat", {
               controller: "compat",
               templateUrl: "/app/compat/compat.html"
           })
        .otherwise({ redirectTo: "/home" });
    $locationProvider.html5Mode(true);
});