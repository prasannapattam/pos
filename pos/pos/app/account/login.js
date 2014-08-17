'use strict';

angular.module('pos').controller('login', login);
login.$inject = ['accountService'];

function login(accountService) {
    var model = {
        UserName: '',
        UserPassword: ''
    };


    var vm = {
        model: model,
        init: init,
        userNameFocus: true,
        submitted: false,
        validate: validate,
        isFormSubmitted: isFormSubmitted
    };

    init();

    return vm;

    function init() {

    }

    function validate(form) {
        //alert('validating');
        vm.submitted = true;
        if (form.$valid)
        {
            accountService.validate(vm.model).success(function () {
                alert('Validation successfull');
            });
        }
    }

    function isFormSubmitted(field) {
        //console.log(field);
        return vm.submitted || field.$dirty;
    };

}

