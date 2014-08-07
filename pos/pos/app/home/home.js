'use strict';
angular.module('pos').controller('home', home)
home.$inject = ['homeService'];

function home(homeService) {

    var vm = {
        model: {},
    };

    init();

    return vm;

    function init() {

    }

}


