(function () {

    "use strict";

    angular.module('app.auth')
            .service('AuthSvc', AuthSvc);

    /*@ngInject*/
    function AuthSvc($q, localStorageService, $http, API_INFOGUIA, APP_UAUTH) {

        var AUTHSERVICEBASE = {
            LOGIN: API_INFOGUIA + '/auth/admin/login'
        };

        var service = {
            attemptLogin: function (loginObject) {

                return $q(function (resolve, reject) {

                    var login = {
                        username: loginObject.username || "",
                        password: loginObject.password || "",
                        //rememberMe: loginObject.rememberMe || false
                    };

                    $http({
                        method: "POST",
                        url: AUTHSERVICEBASE.LOGIN,
                        data: login,
                        headers: {
                          'Content-Type': 'application/json'
                        },                        
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        if (response.data)
                            resolve(response.data);
                        else
                            reject(response.status);
                    }

                    function errorResponse(response) {
                        reject(response.status);
                    }
                })
            },
            logout: function () {
                return $q(function (resolve, reject) {
                    localStorageService.clearAll();
                    resolve(true);
                })
            },
            signup: function (data) {

            },
            isAuth: function () {
                var token = localStorageService.get('bearer');
                if (token)
                    return true;

                return false;
            },
            appUser: function () {
                return localStorageService.get(APP_UAUTH.key);
            },
            appUserFullName: function () {
                var u = localStorageService.get(APP_UAUTH.key);
                return u.nombres + ' ' + u.apellidos;
            }
        }

        return service;
    }


})();

