/**
 * Jarvis Widget Directive
 *
 *    colorbutton="false"
 *    editbutton="false"
      togglebutton="false"
       deletebutton="false"
        fullscreenbutton="false"
        custombutton="false"
        collapsed="true"
          sortable="false"
 *
 *
 */
"use strict";

angular.module('SmartAdmin.Layout').directive('jarvisWidget', function ($rootScope) {
    return {
        restrict: "A",
        //compile: function(element, attributes){
        //    if(element.data('widget-color'))
        //        element.addClass('jarviswidget-color-' + element.data('widget-color'));


        //    element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');

        //    element.addClass('jarviswidget');
        //    $rootScope.$emit('jarvisWidgetAdded', element )

        //}

        link: function (scope, element, attributes) {

            if (element.data('widget-color'))
                element.addClass('jarviswidget-color-' + element.data('widget-color'));

            element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');

            element.addClass('jarviswidget jarviswidget-sortable');

            var elementId = attributes.id;
            if (elementId == undefined || elementId == null) {
                elementId = 'jarviswidget-' + parseInt(Math.random() * 10000);
            }

            var _widgetKey = elementId + parseInt(Math.random() * 10000);
            element.id = _widgetKey;
            $rootScope.$emit('jarvisWidgetAdded', { widget: element, widgetKey: _widgetKey });

        }


    }
});