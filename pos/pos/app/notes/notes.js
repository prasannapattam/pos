'use strict';

angular.module('pos').controller('notes', notes);
notes.$inject = ['$scope', 'notesService', 'session', 'formUtility', 'utility', 'moment', 'constants', '$window', '$mdDialog', 'navigation'];

function notes($scope, notesService, session, formUtility, utility, moment, constants, $window, $mdDialog, navigation) {
    var vm = {
        model: {},
        doctors: [],
        init: init,
        saveNotes: saveNotes,
        cancelNotes: cancelNotes,
        aftersavenotes: aftersavenotes,
        utility: utility,
        signOffNotes: signOffNotes,
        correctNotes: correctNotes,
        constants:constants
    };

    init();

    return vm;

    function init() {
        vm.model = notesService.model;
        vm.doctors = notesService.doctors;

        addViewModelExtenders();
        //var object = angular.extend({}, vm.model, History);

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

        formUtility.cancelForm(evt, form).then(function (result) {
            if (result) {
                navigation.gobacktoPatient(vm.model.hdnPatientID.Value, vm.model.PatientName.Value);
            }
        });
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
        notesService.save(savetype, model).then(function () {
            navigation.gobacktoPatient(vm.model.hdnPatientID.Value, vm.model.PatientName.Value);
        });
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

    //function deleteComputedProperties() {
    //    delete vm.model.HeaderText;
    //    delete vm.model.AgeCalculation;
    //    delete vm.model.HxFromList;
    //    delete vm.model.HxFromOther;
    //    delete vm.model.HxFromCalculation;
    //    delete vm.model.CopyToCalculation;
    //    delete vm.model.SummaryCalculation;
    //    delete vm.model.DiscussedCalculation;
    //}

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

        if (hxFrom != undefined && hxFrom !== "" && hxFrom != "patient") {
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

    function addViewModelExtenders() {

        angular.forEach(vm.model.History.Rfx, function (item, index) {
            $scope.$watchGroup(['vm.model.History.Rfx[' + index + '].FieldValue.ManRfxOD1', 'vm.model.History.Rfx[' + index + '].FieldValue.ManRfxOD2', 'vm.model.History.Rfx[' + index + '].FieldValue.ManRfxOS1', 'vm.model.History.Rfx[' + index + '].FieldValue.ManRfxOS2'], function (newValues, oldValues) {
                item.FieldValue.ManRfx = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Rfx[' + index + '].FieldValue.ManVAOD1', 'vm.model.History.Rfx[' + index + '].FieldValue.ManVAOD2', 'vm.model.History.Rfx[' + index + '].FieldValue.ManVSOS1', 'vm.model.History.Rfx[' + index + '].FieldValue.ManVSOS2'], function (newValues, oldValues) {
                item.FieldValue.ManVA = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Rfx[' + index + '].FieldValue.CycRfxOD', "", 'vm.model.History.Rfx[' + index + '].FieldValue.CycRfxOS', ""], function (newValues, oldValues) {
                item.FieldValue.CycRfx = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Rfx[' + index + '].FieldValue.CycVAOD3', 'vm.model.History.Rfx[' + index + '].FieldValue.CycVAOD4', 'vm.model.History.Rfx[' + index + '].FieldValue.CycVSOS1', 'vm.model.History.Rfx[' + index + '].FieldValue.CycVSOS2'], function (newValues, oldValues) {
                item.FieldValue.CycVA = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Rfx[' + index + '].FieldValue.ManRfx', 'vm.model.History.Rfx[' + index + '].FieldValue.ManVA', 'vm.model.History.Rfx[' + index + '].FieldValue.CycRfx', 'vm.model.History.Rfx[' + index + '].FieldValue.CycVA'], function (newValues, oldValues) {
                item.FieldValue.HasHistory = (newValues[0] !== "" || newValues[1] !== "" || newValues[2] !== "" || newValues[3] !== "");
            });
        });

        angular.forEach(vm.model.History.Cch, function (item, index) {
            $scope.$watchGroup(['vm.model.History.Cch[' + index + '].FieldValue.Compliant', 'vm.model.History.Cch[' + index + '].FieldValue.SubjectiveHistory'], function (newValues, oldValues) {
                item.FieldValue.HasCcHistory = (newValues[0] !== "" || newValues[1] !== "");
            });
            $scope.$watchGroup(['vm.model.History.Cch[' + index + '].FieldValue.Summary'], function (newValues, oldValues) {
                item.FieldValue.HasSumHistory = (newValues[0] !== "");
            });
        });

        angular.forEach(vm.model.History.Dist, function (item, index) {
            $scope.$watchGroup(['vm.model.History.Dist[' + index + '].FieldValue.VAscOD1', 'vm.model.History.Dist[' + index + '].FieldValue.VAscOD2', 'vm.model.History.Dist[' + index + '].FieldValue.DistOS1', 'vm.model.History.Dist[' + index + '].FieldValue.DistOS2'], function (newValues, oldValues) {
                item.FieldValue.VAsc = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Dist[' + index + '].FieldValue.VAccOD1', 'vm.model.History.Dist[' + index + '].FieldValue.VAccOD2', 'vm.model.History.Dist[' + index + '].FieldValue.DistOS3', 'vm.model.History.Dist[' + index + '].FieldValue.DistOS4'], function (newValues, oldValues) {
                item.FieldValue.VAcc = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Dist[' + index + '].FieldValue.VAOD1', 'vm.model.History.Dist[' + index + '].FieldValue.VAOD2', 'vm.model.History.Dist[' + index + '].FieldValue.NearOS1', 'vm.model.History.Dist[' + index + '].FieldValue.NearOS2'], function (newValues, oldValues) {
                item.FieldValue.VAnear = GetOdOsString(newValues[0], newValues[1], newValues[2], newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Dist[' + index + '].FieldValue.VAsc', 'vm.model.History.Dist[' + index + '].FieldValue.VAcc', 'vm.model.History.Dist[' + index + '].FieldValue.VAnear'], function (newValues, oldValues) {
                item.FieldValue.HasHistory = (newValues[0] !== "" || newValues[1] !== "" || newValues[2] !== "");
            });
        });

        angular.forEach(vm.model.History.Bino, function (item, index) {
            $scope.$watchGroup(['vm.model.History.Bino[' + index + '].FieldValue.Binocularity1', 'vm.model.History.Bino[' + index + '].FieldValue.Binocularity2', 'vm.model.History.Bino[' + index + '].FieldValue.Binocularity3', 'vm.model.History.Bino[' + index + '].FieldValue.Binocularity4'], function (newValues, oldValues) {
                item.FieldValue.Binocularity = (newValues[0] + " " + newValues[1] + " " + newValues[2] + " " + newValues[3]);
            });
            $scope.$watchGroup(['vm.model.History.Bino[' + index + '].FieldValue.W4DNear1', 'vm.model.History.Bino[' + index + '].FieldValue.W4DNear2'], function (newValues, oldValues) {
                item.FieldValue.W4DNear = (newValues[0] + " " + newValues[1]);
            });
            $scope.$watchGroup(['vm.model.History.Bino[' + index + '].FieldValue.Stereo1', 'vm.model.History.Bino[' + index + '].FieldValue.Stereo2'], function (newValues, oldValues) {
                item.FieldValue.Stereo = (newValues[0] + " " + newValues[1]);
            });
            $scope.$watchGroup(['vm.model.History.Bino[' + index + '].FieldValue.Binocularity', 'vm.model.History.Dist[' + index + '].FieldValue.W4DNear', 'vm.model.History.Dist[' + index + '].FieldValue.Stereo'], function (newValues, oldValues) {
                item.FieldValue.HasHistory = (newValues[0] !== "" || newValues[1] !== "" || newValues[2] !== "");
            });
        });

        angular.forEach(vm.model.History.Ocm, function (item, index) {
            item.FieldValue.HasHistory = true;
        });

    }

    function GetOdOsString(od1, od2, os1, os2) {
        var od = od1;
        if (od2 !== "" && od2 !== undefined)
            od += " " + od2;
        var os = os1;
        if (os2 !== "" && os2 !== undefined)
            os += " " + os2;

        var ou = "";

        if (od == os)
            ou = od;

        od = (od == "" || od == undefined) ? od : od + " OD ";
        os = (os == "" || os == undefined) ? os : os + " OS";
        ou = (ou == "" || ou == undefined) ? ou : ou + " OU";

        var odosString = "";

        if ((od != "" && od != undefined) || (os != "" && os != undefined)) {
            if (ou != "" && ou != undefined)
                odosString = ou;
            else
                odosString = od + os;
        }

        return odosString;
    }



    //function showHistory(historyType)
    //{        
    //    $mdDialog.show({
    //        controller: history,
    //        controllerAs: "vm",
    //        clickOutsideToClose: true,
    //        templateUrl: utility.virtualDirectory + '/app/notes/history.html',
    //        locals: { $mdDialog: $mdDialog, notesModel: vm.model, historyType: historyType }
    //    });
        
    //}
}

