'use strict';

angular.module('pos').controller('login', login);
login.$inject = ['accountService'];

function login(accountService) {

    var vm = {
        model: {},
        init: init,
        userNameFocus: true,
        submitted: false,
        validate: validate,
        isFormSubmitted: isFormSubmitted
    };

    init();

    return vm;

    function init() {
        vm.model = accountService.model;
    }

    function validate(form) {
        vm.submitted = true;
        if (form.$valid)
        {
            accountService.validate(vm.model).success(function () {
                alert('Validation successfull');
            });
        }
    }

    function isFormSubmitted(field) {
        return vm.submitted || field.$dirty;
    };

}

