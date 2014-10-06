'use strict';

angular.module('pos').factory('webapiInterceptor', webapiInterceptor);
webapiInterceptor.$inject = ['$q', 'navigation', 'utility'];

function webapiInterceptor($q, navigation, utility) {

    var rawapiUrl = '/api/';
    var apiUrl = window.virtualDirectory + '/api/';

    return {
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
    };

    //request success
    function request(config) {
        if (config.url.indexOf(rawapiUrl) === 0)
            config.url = window.virtualDirectory + config.url;

        if (config.url.indexOf(apiUrl) === 0)
            navigation.isLoading = true;

        // Return the config or promise.
        return config || $q.when(config);
    }

    //request error
    function requestError(rejection) {
        if (rejection.url.indexOf(apiUrl) === 0)
            navigation.isLoading = false;
        utility.showError(rejection.data.Message);

        // Return the promise rejection.
        return $q.reject(rejection);
    }

    // response success
    function response(response) {
        if (response.config.url.indexOf(apiUrl) === 0)
            navigation.isLoading = false;

        //checking whether we got our AjaxModel
        if (response.data.hasOwnProperty("Success") && response.data.hasOwnProperty("Message") && response.data.hasOwnProperty("Model")) {
            if (response.data.Success === false) {
                //alert(response.data.Message);
                utility.showError(response.data.Message);
                return $q.reject(response);
            }
            else {
                response.data = response.data.Model;
            }
        }

        // Return the response or promise.
        return response || $q.when(response);
    }

    //response Error
    function responseError(rejection) {
        if (rejection.config.url.indexOf(apiUrl) === 0) {
            navigation.isLoading = false;
            utility.showError(rejection.data.Message);
        }
            
        // Return the promise rejection.
        return $q.reject(rejection);
    }
}


