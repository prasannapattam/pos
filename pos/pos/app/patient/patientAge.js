'use strict'

angular.module('pos').filter('patientAge', patientAge);
patientAge.$inject = ['moment'];

function patientAge(moment) {
    return function (dob) {
        var todayMoment = moment();
        var dobMoment = moment(dob);

        if (todayMoment.isValid() === true && dobMoment.isValid() === true) {
            var age = todayMoment.diff(dobMoment);
            var duration = moment.duration(age);
            var totalDays = duration.asDays();
            var totalWeeks = parseInt(totalDays / 7);
            var totalMonths = parseInt(totalDays / 30);
            var totalYears = parseInt(totalMonths / 12);
            var months = totalMonths - (totalYears * 12);

            var age = '';
            if (totalMonths <= 6)
                age = totalWeeks + " weeks";
            else if (totalWeeks < 12)
                age = totalMonths + " month-old";
            else if (totalYears <= 10)
                age = totalYears + '.' + months + " year-old";
            else
                age = totalYears + " year-old";

            return age;
        }
        else {
            return "";
        }
    }
}

