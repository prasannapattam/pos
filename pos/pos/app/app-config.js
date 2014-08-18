'use strict';

angular.module('pos').config(appConfig);
appConfig.$inject = ['$httpProvider', 'sessionProvider'];

angular.module('pos').run(appRun);
appRun.$inject = ['$rootScope', 'session'];



function appConfig($httpProvider, sessionProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('webapiInterceptor');

}

function appRun($rootScope, session) {
    
    session.initialize();

    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.isLoading = false;
    });
}