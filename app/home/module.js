"use strict";


angular.module('app.home', ['ui.router'])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.home', {
            url: '/home',
            data: {
                title: ''
            },
            views: {
                "content@app": {
                    templateUrl: 'app/home/views/home.html',
                    controller: 'HomeController'
                }
            }
        })
});
