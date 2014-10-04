'use strict'

angular.module('pos').factory('notestestService', notestestService);

notestestService.$inject = ['$http', '$route', 'constants', 'profile'];

function notestestService($http, $route, constants, profile) {
    var model = {};
    var doctors;
    var notespatientid;
    var notesexamid;
    var doctors;

    var service = {
        model: model,
        resolve: resolve,
        doctors: doctors
    };

    return service;

    //this gets called from the routing. Use this to get data from webapi
    function resolve() {
        notespatientid = $route.current.params.patientid;
        notesexamid = $route.current.params.examid;

        if (parseInt($route.current.params.notestype) === constants.notesType.Default) {
            //get the default notes
        }
        else {
            return getNotes(profile.userName)
        }
    }

    function getNotes(doctorUserName) {
        var getdata = { params: { "userName": doctorUserName, "patientid": notespatientid, "examid": notesexamid || '' } };
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
                    options = addViewModelExtenders();
                    service.model = model;
                }
                service.doctors = data.Doctors;
                //window.autoComplete = data.Model.AutoComplete;
                //addComputedProperties();
                //setOverrides();

                return data;
        });

    }

}
