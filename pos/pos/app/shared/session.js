'use strict'

angular.module('pos').provider('session', session);
//session.$inject = ['$rootScope'];

function session() {

    var vm = {
        initialize: initialize
    };

    function initialize() {
        //alert('initialize');
    };


    this.$get = function () {

        return vm;
    };

};
