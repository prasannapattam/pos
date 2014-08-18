'use strict'

angular.module('pos').factory('profile', profile);
profile.$inject = ['utility'];

function profile(utility) {
    var userID = 1;
    var firstName = 'Prasanna';
    var lastName = 'Pattam';
    var userName = 'prasanna';
    var photoUrl = '/pos/data/prasanna.jpg';
    var isAuthenticated = false;


    var vm = {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        photoUrl: photoUrl,
        isAuthenticated: isAuthenticated,
        populate: populate,
        logout: logout
    };

    return vm;

    function populate(data) {
        vm.userID = data.UserID;
        vm.firstName = data.FirstName;
        vm.lastName = data.LastName;
        vm.userName = data.UserName;
        if (data.PhotoUrl === null) {
            vm.photoUrl = utility.virtualDirectory + '/Data/NoPhoto.jpg';
        }
        else {
            vm.photoUrl = utility.virtualDirectory + '/Data/' + data.PhotoUrl + '.jpg';
        }
        vm.isAuthenticated = true;
    };

    function logout() {
        this.photoUrl = undefined;
        this.isAuthenticated = false;
    };
};

