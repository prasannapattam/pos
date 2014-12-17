'use strict';
angular.module('pos').controller('fileUploader', fileUploader)
fileUploader.$inject = ['$scope', '$http', 'notesService', 'formUtility'];

function fileUploader($scope, $http, notesService, formUtility) {

    var vm = {
        model: {},
        init: init,
        saveNotes: saveNotes,
        cancelNotes: cancelNotes
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;
        vm.model.SpcWr1OD.ColourType = 1;
        vm.model.Mentation1.ColourType = 1;
        vm.model.Compliant.ColourType = 1;
        vm.model.ExamDate.ColourType = 1;
    }


    $scope.setFile = function (element) {
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



