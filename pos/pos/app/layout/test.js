'use strict';
angular.module('pos').controller('fileUploader', fileUploader)
fileUploader.$inject = ['$scope', '$http'];

function fileUploader($scope, $http) {
    $scope.setFile = function(element) {
        $scope.currentFile = element.files[0];
    }

    $scope.UploadFile = function () {
        var formData = new FormData();
        formData.append("file", $scope.currentFile);
        return $http.post("/api/user", formData, {
            headers: { 'Content-Type': undefined }, transformRequest: angular.identity
        });
    }
};



