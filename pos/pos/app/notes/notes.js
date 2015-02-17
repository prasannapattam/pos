'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['$scope','notesService', 'session', 'formUtility', 'utility', 'moment'];

function notes($scope, notesService, session, formUtility, utility, moment) {
    var vm = {
        model: {},
        doctors: [],
        init: init,
        saveNotes: saveNotes,
        cancelNotes: cancelNotes,
        aftersavenotes: aftersavenotes,
        utility: utility
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;
        vm.doctors = notesService.doctors;

        //UI related changes to the model
        //vm.model.Premature.LookUpFieldName = "BOOL";

        vm.model.HxFromList = {
            Name: 'HxFromList',
            Value: vm.model.HxFrom.Value,
            LookUpFieldName: vm.model.HxFrom.LookUpFieldName,
            ColourType: vm.model.HxFrom.ColourType
        };

        vm.model.HxFromOther = {
            Name: 'HxFromOther',
            Value: vm.model.HxFrom.Value,
            LookUpFieldName: vm.model.HxFrom.LookUpFieldName,
            ColourType: vm.model.HxFrom.ColourType
        }

        //HxFrom
        if (utility.lookupExists(session.lookups.HxFrom, vm.model.HxFrom.Value)) {
            vm.model.HxFromList.Value = vm.model.HxFrom.Value;
            vm.model.HxFromOther.Value = '';
        }
        else {
            vm.model.HxFromList.Value = '';
            vm.model.HxFromOther.Value = vm.model.HxFrom.Value;
        }


        //removing the weeks (fix for old data)
        if (vm.model.GA.Value === "weeks") {
            vm.model.GA.Value = "";
            vm.model.GA.ColourType = 0;
        }
        if (vm.model.PCA.Value === "weeks") {
            vm.model.PCA.Value = "";
            vm.model.PCA.ColourType = 0;
        }

        //Add watchers
        notesWatchers();
    }

    function saveNotes(data) {
        //alert('saved');
    }

    function cancelNotes(evt, form) {
        formUtility.cancelForm(evt, form);
    }

    function aftersavenotes() {
        //alert(vm.model.SpcWr1OD.Value);
    }

    function notesWatchers() {
        //age calculation
        $scope.$watchGroup(['vm.model.ExamDate.Value', 'vm.model.DOB.Value'], function (newValues, oldValues) {
            var examDateMoment = moment(newValues[0]);
            var dobMoment = moment(newValues[1]);

            if (examDateMoment.isValid() === true && dobMoment.isValid() === true) {
                var age = examDateMoment.diff(dobMoment);
                var duration = moment.duration(age);
                var totalDays = duration.asDays();
                var totalWeeks = parseInt(duration.asWeeks());
                var totalMonths = parseInt(duration.asMonths());

                var years = duration.years();
                var months = duration.months();

                var age = '';
                if (totalMonths <= 6)
                    age = totalWeeks + " weeks";
                else if (totalMonths < 12)
                    age = months + " month-old";
                else if (years <= 10)
                    age = years + '.' + months + " year-old";
                else
                    age = years + " year-old";

                vm.model.tbAge.Value = age;
            }
        });

    }
}

