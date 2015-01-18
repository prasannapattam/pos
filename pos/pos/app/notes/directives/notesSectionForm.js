angular.module('pos').directive('notesSectionForm', notesSectionForm);
notesSectionForm.$inject = ['$document'];

function notesSectionForm($document) {
    return {
        restrict: 'A',
        link: link,
        scope: {
            sectionForm: '=name',
        }
    }

    function link(scope, element, attrs, nullController, transclude) {
        $(element).on('dblclick', function () {
            scope.sectionForm.$show()
        });

        //closing the form is the user clicks outside the form
        $document.on("click", function (event) {
            var isChild = $(element).find(event.target).length > 0;

            if (!isChild) {
                scope.sectionForm.$submit();
            }

        });
    }
}

