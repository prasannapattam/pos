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
            vm.model.tbAge.Value = getAge(newValues[1], newValues[0]);
        });

        $scope.$watchGroup(['vm.model.Age.Value', 'vm.model.tbAge.Value', 'vm.model.GA.Value', 'vm.model.PCA.Value', 'vm.model.BirthWt.Value'], function (newValues, oldValues) {
            summaryCalulation(newValues[0], newValues[1], newValues[2], newValues[3], newValues[4]);
        });
    }

    function getAge(dob, examDate) {

        var diff = utility.dateDiff(dob, examDate);

        var age = '';
        if (diff.years === 0 && diff.months < 6)
            age = diff.weeks + " weeks";
        else if (diff.years === 0 && diff.months < 12)
            age = diff.months + " month-old";
        else if (diff.years < 10)
            age = diff.years + '.' + diff.months + " year-old";
        else
            age = diff.years + " year-old";

        return age;

    }

    function summaryCalulation(oldAge, newAge, gaText, pcaText, birthWeightText) {
        var summary = vm.model.Summary.Value;

        //replacing the age
        if (oldAge !== newAge) {
            if (oldAge !== "" && summary.indexOf(oldAge) !== -1)
                summary = summary.replace(oldAge, newAge);
            else
                summary = summary.replace(/[0-9. ]+year[- ]+old/i, newAge);
            vm.model.Age.Value = newAge;
        }


        if (gaText !== "weeks" && gaText !== "")
            summary = summary.replace("[GA]", gaText);
        if (pcaText !== "weeks" && pcaText !== "")
            summary = summary.replace("[PCA]", pcaText);
        if (birthWeightText !== "")
            summary = summary.replace("[BW]", birthWeightText);

        if (vm.model.Summary.Value !== summary)
            vm.model.Summary.Value = summary;
    }
}

