'use strict'

angular.module('pos').factory('notesService', notesService);

notesService.$inject = ['$http', 'session'];

function notesService($http, session) {

    var service = {
        model: {},
        resolve: resolve,
        save: save
    };

    return service;

    function resolve(patientid, notesid) {
        var getdata = { params: { "userName": session.profile.userName, "patientid": patientid, "examid": notesid || '' } };
        return $http.get('/api/notes', getdata).success(function (data) {
            var model = data.Notes;
            model.HxFromList = {
                Name: 'HxFromList',
                Value: model.HxFrom.Value,
                LookUpFieldName: model.HxFrom.LookUpFieldName,
                ColourType: model.HxFrom.ColourType
            };

            model.HxFromOther = {
                Name: 'HxFromOther',
                Value: model.HxFrom.Value,
                LookUpFieldName: model.HxFrom.LookUpFieldName,
                ColourType: model.HxFrom.ColourType
            }

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
            //window.autoComplete = data.Model.AutoComplete;
            //addComputedProperties();
            //setOverrides();

            return data;
        });
    }

    function save() {

    }

}
