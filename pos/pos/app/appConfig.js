'use strict';

angular.module('pos').config(appConfig);
appConfig.$inject = ['$httpProvider'];


function appConfig($httpProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('webapiInterceptor');

}

angular.module('pos').run(appRun);
appRun.$inject = ['session', 'editableOptions'];
function appRun(session, editableOptions) {
    session.initialize();
    editableOptions.theme = 'bs3';
}


//global variables
angular.module('pos').value('toastr', toastr)
angular.module('pos').value('moment', moment)


