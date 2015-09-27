'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['$scope', 'notesService', 'session', 'formUtility', 'utility', 'moment', 'constants', '$window'];

function notes($scope, notesService, session, formUtility, utility, moment, constants, $window) {
    var vm = {
        model: {},
        doctors: [],
        init: init,
        saveNotes: saveNotes,
        cancelNotes: cancelNotes,
        aftersavenotes: aftersavenotes,
        utility: utility,
        signOffNotes: signOffNotes,
        correctNotes: correctNotes
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;
        vm.doctors = notesService.doctors;

        //UI related changes to the model

        //HxFrom
        vm.model.HxFromList = {
            Name: 'HxFromList',
            Value: vm.model.HxFrom.Value,
            LookUpFieldName: vm.model.HxFrom.LookUpFieldName,
            ColourType: vm.model.HxFrom.ColourType
        };

        vm.model.HxFromOther = {
            Name: 'HxFromOther',
            Value: vm.model.HxFrom.Value,
            ColourType: vm.model.HxFrom.ColourType
        }

        if (utility.lookupExists(session.lookups.HxFrom, vm.model.HxFrom.Value)) {
            vm.model.HxFromList.Value = vm.model.HxFrom.Value;
            vm.model.HxFromOther.Value = '';
        }
        else {
            vm.model.HxFromList.Value = '';
            vm.model.HxFromOther.Value = vm.model.HxFrom.Value;
        }


        //Add watchers
        notesWatchers();

        $scope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            notesService.showPatientMenu();
            //evt.preventDefault();

        });

        notesService.hidePatientMenu();

        //Set visibility of Controls
        setVisibility();
    }

   

    function cancelNotes(evt, form) {
        formUtility.cancelFormGoBack(evt, form);
    }

    function saveNotes() {
        saveAll(constants.notesSaveType.Save, vm.model);
    }

    function aftersavenotes() {
        //alert(vm.model.SpcWr1OD.Value);
    }

    function signOffNotes() {
        saveAll(constants.notesSaveType.SignOff, vm.model);
    }

    function correctNotes() {
        saveAll(constants.notesSaveType.Correct, vm.model);
    }

    function saveAll(savetype, model) {        
        
        if ((savetype === constants.notesSaveType.SignOff || savetype === constants.notesSaveType.Correct) && !validateNotes())
            return;

        //deleteComputedProperties();
        notesService.save(savetype, model);
        $window.history.back();
    }

    function validateNotes() {
        var ret = CheckNoPref();

        if (ret) {
            if ((vm.model.SLE.Value == true || vm.model.PenLight.Value == true) && vm.model.Dilate3.Value !== undefined)
                ret = true;
            else {
                utility.showError('SLE/Pen-light options and dilated options are required');
                ret = false;
            }
        }

        return ret;
    }

    function CheckNoPref() {
        var noprefchecked = vm.model.NoPref.Value;
        if (noprefchecked) {
            var od = vm.model.VAscOD1.Value + ' ' + vm.model.VAscOD2.Value;
            var os = vm.model.DistOS1.Value + ' ' + vm.model.DistOS2.Value;

            if (od != os) {
                utility.showError('VA sc Dist OD and OS should be equal when No Pref checkbox is checked');
                return false;
            }
        }

        return true;
    }

    function deleteComputedProperties() {
        delete vm.model.HeaderText;
        delete vm.model.AgeCalculation;
        delete vm.model.HxFromList;
        delete vm.model.HxFromOther;
        delete vm.model.HxFromCalculation;
        delete vm.model.CopyToCalculation;
        delete vm.model.SummaryCalculation;
        delete vm.model.DiscussedCalculation;
    }

    function notesWatchers() {
        //age calculation
        $scope.$watchGroup(['vm.model.ExamDate.Value', 'vm.model.DOB.Value'], function (newValues, oldValues) {
            ageCalculation(newValues[1], newValues[0]);
        });

        //summary calculation
        $scope.$watchGroup(['vm.model.Age.Value', 'vm.model.tbAge.Value', 'vm.model.GA.Value', 'vm.model.PCA.Value', 'vm.model.BirthWt.Value'], function (newValues, oldValues) {
            summaryCalulation(newValues[0], newValues[1], newValues[2], newValues[3], newValues[4]);
        });

        //HxFrom calculation
        $scope.$watchGroup(['vm.model.HxFromList.Value', 'vm.model.HxFromOther.Value'], function (newValues, oldValues) {
          
                if (newValues[0] === "") {
                    vm.model.HxFrom.Value = newValues[1];
                }
                else {
                    vm.model.HxFromOther.Value = "";
                    vm.model.HxFrom.Value = newValues[0];
                }
        });

        //discussedCalculation
        $scope.$watchGroup(['vm.model.HxFrom.Value', 'vm.model.FirstName.Value', 'vm.model.Sex.Value'], function (newValues, oldValues) {
            discussedCalculation(newValues[0], newValues[1], newValues[2]);
        });


    }

    function ageCalculation(dob, examDate) {

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

        vm.model.tbAge.Value = age;

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
    
    function discussedCalculation(hxFrom, FirstName, sex) {

        var discussed = "Discussed findings with " + FirstName;

        if (hxFrom !== "" && hxFrom != "patient") {
            var displaySex = '';
            if (hxFrom.indexOf("patient and") >= 0) {
                hxFrom = hxFrom.replace("patient and", "").trim();
                if (sex.toLowerCase() == 'female')
                    displaySex += "her";
                else
                    displaySex += "his";
                discussed += " and " + displaySex + " " + hxFrom;
            }
            else {
                discussed += "'s " + hxFrom;
            }

        }
        vm.model.Discussed.Value = discussed;
    }

    function setVisibility() {
        vm.model.hideSave = vm.model.NotesType !== constants.notesType.New && vm.model.NotesType !== constants.notesType.Saved;
        vm.model.hideCorrect = vm.model.NotesType !== constants.notesType.Correct;
        vm.model.hideSignOff = vm.model.NotesType !== constants.notesType.New && vm.model.NotesType !== constants.notesType.Saved;
    }
}

