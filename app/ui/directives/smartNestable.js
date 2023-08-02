'use strict';

angular.module('app.ui').directive('smartNestable', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            group: '@',
            output: '='
        },
        link: function (scope, element, attributes) { 
            var options = { maxDepth: 1 };
            if (scope.group) {
                options.group = scope.group;
            }
            element.nestable(options); 
            if (attributes.output) {
                element.on('change', function () {
                    $timeout(function () {
                        scope.$apply(function () {
                            scope.output = element.nestable('serialize');
                        });
                    }, 1000)
                });
    
                scope.output = element.nestable('serialize');
            }

        }
    }
});