'use strict';

angular.module('pos').config(appConfig);
appConfig.$inject = ['$httpProvider', 'sessionProvider'];

angular.module('pos').run(appRun);
appRun.$inject = ['session'];

app.value('toastr', toastr)


function appConfig($httpProvider, sessionProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('webapiInterceptor');

}

function appRun(session) {
    
    session.initialize();
}