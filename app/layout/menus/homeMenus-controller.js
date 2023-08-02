//"use strict";

//angular.module('app.layout').controller('homeMenusController', function ($filter, $state, appService, $scope, $rootScope, $stateParams, $log) {
//    var vm = this;
//    var root = $rootScope;
//    root.currentUser = { id: 1 };
//    root.currentLang = { id: 1 };


//    vm.openMenu = function (menu) {
//        if (angular.isString(menu.StateName)) {
//            var params = { formId: null, apiController: null };
//            if (angular.isDefined(menu.FormId)) params.formId = menu.FormId;
//            if (angular.isDefined(menu.FormController)) params.apiController = menu.FormController;

//            $state.go(menu.StateName, params);
//        }

//    };  

//    //Get All Cuurent User Menus
//    var queryString = '?userId=' + root.currentUser.id + ' &langId=' + root.currentLang.id;
//    appService.get("HomeMenus", 'GetAll', queryString, function (result) {
//        vm.allMenus = result.data;
//    }, function (result) {
//        appService.alert("Can not load menus.");
//    }, null);


//    vm.getChildMenus = function (menuId) {
//        if (angular.isUndefined(menuId) || menuId == '') menuId = null;
//        var orderBy = $filter('orderBy');
//        var children = [];
//        if (vm.allMenus != undefined) {
//            children = $filter('filter')(vm.allMenus, { ParentId: menuId }, true);
//        }
//        if (children.length > 0) {
//            return orderBy(children, function (item) { return parseInt(item.MenuOrder); }, false/*Reverse=false*/);
//        }
//        return [];
//    };


//});

