'use strict'

angular.module('pos').factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {

    var service = {
        model: [],
        fetch: fetch,
        save: save
    };

    return service;

    function fetch() {
        return $http.get("/api/user")
            .success(function (data) {
                service.model = data;
            });
    }

    function save(user) {
        return $http.post("/api/user", user, { headers: { 'Content-Type': undefined }, transformRequest: transformPost });
    }

    function transformPost(data) {
        var formData = new FormData();
        angular.forEach(data, function (value, key) {
            if (key !== "photo") {
                formData.append(key, value);
            }
        });
        if (data.photo !== undefined) {
            formData.append("file", data.photo);
        }
        return formData;
    }

}


//http://stackoverflow.com/questions/21576590/how-to-access-files-from-child-scope-with-angularjs

//This has lot of features that can be used
//https://github.com/danialfarid/angular-file-upload
//https://github.com/nervgh/angular-file-upload (has canvas preview)


//seems easiest
//http://csharp-online.blogspot.in/2014/08/angularjs-file-upload.html

//simple with webapi code. Also has directive
//http://cgeers.com/2013/05/03/angularjs-file-upload/


//-------- Preview -------------
//https://angular-file-upload.appspot.com/\


//directive ng-file-select
//http://stackoverflow.com/questions/21576590/how-to-access-files-from-child-scope-with-angularjs