'use strict';

angular.module('pos').config(appConfig);
appConfig.$inject = ['$httpProvider', 'sessionProvider'];


function appConfig($httpProvider, sessionProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('webapiInterceptor');

}

angular.module('pos').run(appRun);
appRun.$inject = ['session', 'editableOptions', 'datepickerConfig', 'datepickerPopupConfig'];
function appRun(session, editableOptions, datepickerConfig, datepickerPopupConfig) {
    session.initialize();
    editableOptions.theme = 'bs3';
    datepickerConfig.showWeeks = false;
    datepickerPopupConfig.datepickerPopup = 'MM/dd/yyyy';
    datepickerPopupConfig.showButtonBar = false;
}


//global variables
app.value('toastr', toastr)
app.value('moment', moment)


