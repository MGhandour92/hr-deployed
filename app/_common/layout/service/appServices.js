'use strict';

angular.module('SmartAdmin.Layout').factory('appService',function($http,$filter) {
    var commonFunctions={};
    var applicationName= '';
    var modelError = '';
    var modelIsValid = true;

    var commonFunctions={
        formatDataList : function (data) {
            angular.forEach(data, function (value, key) {
                for (var prop in value) {
                    if (value[prop] != null && prop.indexOf('Date') > -1) {
                        value[prop] = new Date(value[prop]);
                    }
                }
            });
            return data;
        }

   ,convertArrayToObject : function (arr) {
        var obj = {};
        for (var i = 0; i < arr.length; ++i) {
            for (var prop in arr[i]) {
                obj[prop] = arr[i][prop];
            }
        }
        return obj;
    }

   ,getUrl : function (controller, action, queryString) {
       var url = '/api';
       url += '/' + controller + '/' + action;
        if (queryString != null) {
            url += '/' + queryString;
        }
        return url;
    }

   ,translate :function (text, ParamValue) {
        return $filter('filter')(text);
    }

   ,alert : function (message, callBack, title) {
        if (title == null) {
            title = this.applicationName;
        }
        window.alert(message);
    }

   ,confirm : function (message, callBack, title) {
        if (callBack == null) {
            return window.confirm(message);
        }
        if (window.confirm(message)) {
            callBack(1);
        } else {
            callBack(2);
        }
    }

  , getPromise : function (controller, action, queryString) {
        return $http.get(this.getUrl(controller, action, queryString));
    }

   ,get : function (controller, action, queryString, success, failure, always) {
        this.modelIsValid = true
        var vl = $http({
            method: "GET",
            url: this.getUrl(controller, action, queryString)
        });
        //var vl = $http.get(self.getUrl( controller,action,queryString)) ;
        vl.then(function (result) {
            success(result);
            if (always != null) {
                always();
            }
        }, function (result) {
            if (failure != null) {
                failure(result);
            } else {
                var errorMessage = result.status + ':' + result.statusText;
                if (result.data != null && result.data.Message != null) {
                    errorMessage += ' - ' + result.data.Message;
                }
                this.modelError = errorMessage;
                this.modelIsValid = false;
            }
            if (always != null) {
                always();
            }
        });
    }

   ,put : function (controller, action, queryString, itemData, success, failure, always) {
        this.modelIsValid = true
        var vl = $http({
            method: "put",
            url: this.getUrl(controller, action, queryString),
            data: JSON.stringify(itemData)
        });
        vl.then(function (result) {
            success(result);
            if (always != null) {
                always();
            }
        }, function (result) {
            if (failure != null) {
                failure(result);
            } else {
                var errorMessage = result.status + ':' + result.statusText;
                if (result.data != null && result.data.Message != null) {
                    errorMessage += ' - ' + result.data.Message;
                }
                this.modelError = errorMessage;
                this.modelIsValid = false;
            }
            if (always != null) {
                always();
            }
        });
    }

   ,post : function (controller, action, queryString, itemData, success, failure, always) {
        this.modelIsValid = true
        var vl = $http({
            method: "post",
            url: this.getUrl(controller, action, queryString),
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //transformRequest: function (obj) {
            //    var str = [];
            //    for (var p in obj)
            //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //    return str.join("&");
            //},
            data: itemData            
        });
        vl.then(function (result) {
            success(result);
            if (always != null) {
                always();
            }
        }, function (result) {
            if (failure != null) {
                failure(result);
            } else {
                var errorMessage = result.status + ':' + result.statusText;
                if (result.data != null && result.data.Message != null) {
                    errorMessage += ' - ' + result.data.Message;
                }
                this.modelError = errorMessage;
                this.modelIsValid = false;
            }
            if (always != null) {
                always();
            }
        });

    }

   ,delete : function (controller, action, queryString, success, failure, always) {
        this.modelIsValid = true
        var vl = $http({
            method: "delete",
            url: this.getUrl(controller, action, queryString),
        });
        vl.then(function (result) {
            success(result);
            if (always != null) {
                always();
            }
        }, function (result) {
            if (failure != null) {
                failure(result);
            } else {
                var errorMessage = result.status + ':' + result.statusText;
                if (result.data != null && result.data.Message != null) {
                    errorMessage += ' - ' + result.data.Message;
                }
                this.modelError = errorMessage;
                this.modelIsValid = false;
            }
            if (always != null) {
                always();
            }
        });
    }

};

return commonFunctions;
});


