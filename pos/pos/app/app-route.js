'use strict';

angular.module('pos').config(appConfig);
appConfig.$inject = ['$httpProvider'];

function appConfig($httpProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('WebAPIInterceptor');

}