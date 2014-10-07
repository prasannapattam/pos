'use strict';
angular.module('pos').controller('index', index)
index.$inject = ['profile', 'navigation', '$http'];

function index(profile, navigation, $http) {

    var menuItems = [
                        {
                            text: "Menu", url: window.virtualDirectory + "/",
                            items: [
                                { text: "Patients", url: window.virtualDirectory + "/" },
                                { text: "Print Queue", url: window.virtualDirectory + "/printqueue" },
                                { text: "Users", url: window.virtualDirectory + "/users" },
                                { text: "Defaults", url: window.virtualDirectory + "/defaults" },
                                { text: "Auto Correct", url: window.virtualDirectory + "/autocorrect" },
                                { text: "Configuation", url: window.virtualDirectory + "/configuration" },
                                { text: "Logout", url: window.virtualDirectory + "/login" },
                            ]
                        }
                    ];

    var searchCriteria;
    var searchOptions = {
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    $http.post("/api/patientsearch", "'" + options.data.filter.filters[0].value + "'")
                        .success(function (data) {
                            options.success(data)
                        })
                        .error(function (data) {
                            options.success(data.Model);
                        });
                }
            },
            serverFiltering: true
        }),
        dataTextField: "PatientName"
    };



    var vm = {
        menuItems: menuItems,
        profile: profile,
        navigation: navigation,
        menuSelect: menuSelect,
        searchCriteria: searchCriteria,
        searchOptions: searchOptions,
        searchSelect: searchSelect
    };

    init();

    return vm;

    function init() {

    }

    function menuSelect(e) {
        var menu = $("#main-menu").data("kendoMenu");
        menu.close("#main-menu");
    }

    function searchSelect(e) {
        var patient = e.sender.dataItems()[e.item.index()];
        navigation.addTab(patient.PatientName, '/Patient/' + patient.ID);
        vm.searchCriteria = '';
    }
}


