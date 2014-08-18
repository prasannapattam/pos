'use strict';

angular.module('pos').factory('webapiInterceptor', webapiInterceptor);
webapiInterceptor.$inject = ['$q', '$rootScope'];

function webapiInterceptor($q, $rootScope) {

    return {
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
    };

    //request success
    function request(config) {

        $rootScope.isLoading = true;

        // Return the config or promise.
        return config || $q.when(config);
    }

    //request error
    function requestError(rejection) {
        $rootScope.isLoading = false;

        // Return the promise rejection.
        return $q.reject(rejection);
    }

    // response success
    function response(response) {
        $rootScope.isLoading = false;

        //checking whether we got our AjaxModel
        if (response.data.hasOwnProperty("Success") && response.data.hasOwnProperty("Message") && response.data.hasOwnProperty("Model")) {
            if (response.data.Success === false) {
                //alert(response.data.Message);
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
        $rootScope.isLoading = false;

        // Return the promise rejection.
        return $q.reject(rejection);
    }
}


