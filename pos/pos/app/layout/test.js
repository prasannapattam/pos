﻿'use strict';
angular.module('pos').controller('test', test)
test.$inject = ['$scope', '$mdDialog'];

function test($scope, $mdDialog) {
        $scope.alert = '';

        $scope.showAlert = function(ev) {
            $mdDialog.show(
              $mdDialog.alert()
                .title('This is an alert title')
                .content('You can specify some description text in here.')
                .ariaLabel('Password notification')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };

        $scope.showConfirm = function(ev) {
            var confirm = $mdDialog.confirm()
              .title('Would you like to delete your debt?')
              .content('All of the banks have agreed to forgive you your debts.')
              .ariaLabel('Lucky day')
              .ok('Please do it!')
              .cancel('Sounds like a scam')
              .targetEvent(ev);

            $mdDialog.show(confirm).then(function() {
                $scope.alert = 'You decided to get rid of your debt.';
            }, function() {
                $scope.alert = 'You decided to keep your debt.';
            });
        };

    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }


