'use strict'

angular.module('pos').factory('notesService', notesService);

notesService.$inject = ['$http', 'session', 'patientService', 'constants'];

function notesService($http, session, patientService, constants) {

    var service = {
        model: undefined,
        doctors: undefined,
        autoComplete: undefined,
        resolve: resolve,
        save: save,
        setHeader: setHeader,
        showPatientMenu: showPatientMenu,
        hidePatientMenu: hidePatientMenu
    };

    return service;

    function resolve(patientid, notesid) {

        var getdata = { params: { "userName": session.profile.userName, "patientid": patientid, "examid": notesid || '' } };
        return $http.get('/api/notes', getdata).success(function (data) {
            var model = data.Notes;
            //removing the weeks (fix for old data)
            if (model.GA.Value === "weeks") {
                model.GA.Value = "";
                model.GA.ColourType = 0;
            }
            if (model.PCA.Value === "weeks") {
                model.PCA.Value = "";
                model.PCA.ColourType = 0;
            }

            if (service.model !== undefined)
                angular.extend(service.model, model);
            else {
                //options = addViewModelExtenders();
                service.model = model;
            }

            service.doctors = data.Doctors;
            service.autoComplete = data.AutoComplete;

            setHeader();

            //setOverrides();

            return data;
        });
    }
    
    function save(saveType, data) {
        var req = {
            method: 'POST',
            url: 'api/notes/',
            params:{ "type": saveType },
            data: data
        }
        return $http(req);
    }

    function setHeader() {
        var notestype = service.model.NotesType;

        var headerText;
        if (notestype === constants.notesType.Default) {
            headerText = service.model.DoctorName.Value + ' - Notes Default';
        }
        else {
            headerText = service.model.PatientName.Value;
            var ExamID = service.model.hdnExamID;
            var ExamDate = service.model.ExamDate;
            var ExamSaveDate = service.model.ExamSaveDate;
            var ExamCorrectDate = service.model.ExamCorrectDate;
            if (ExamSaveDate !== null) {
                headerText += ' - Notes saved on ' + ExamSaveDate.Value;
            }
            else if (ExamCorrectDate !== null) {
                headerText += ' - Notes taken on ' + ExamDate.Value + ' (Corrected on ' + ExamCorrectDate.Value + ')';
            }
            else if (ExamID !== null) {
                headerText += ' -  Notes taken on ' + ExamDate.Value;
            }
            else {
                headerText += ' - New notes'
            }
        }

        patientService.header = headerText;
    }

    function showPatientMenu() {
        patientService.hideMenu = false;
    }

    function hidePatientMenu() {
        patientService.hideMenu = true;
    }
}
