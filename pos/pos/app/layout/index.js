'use strict';
angular.module('pos').controller('index', index)
index.$inject = ['profile', 'navigation', '$http'];

function index(profile, navigation, $http) {

    var menuItems = [
                        {
                            text: "Menu", url: "/",
                            items: [
                                { text: "Patients", url: "/" },
                                { text: "Print Queue", url: "/printqueue" },
                                { text: "Users", url: "/users" },
                                { text: "Defaults", url: "/defaults" },
                                { text: "Auto Correct", url: "/autocorrect" },
                                { text: "Configuation", url: "/configuration" },
                                { text: "Logout", url: "/login" },
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
        alert(e.item.text());
    }
}


