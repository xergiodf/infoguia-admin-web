'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
        .module('app', [
            'ngAnimate',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'ui.bootstrap',
            'ngMap',
            'ngTagsInput',
            'LocalStorageModule',
            'ngFileUpload',
            'app.auth',
            'cliente.module',
            'sucursal.module',
            'publicacion.module',
            'usuario.module',
            'categoria.module'
        ]);

angular.module('app')
        .config(CompileProviderConfig)
        .config(TestingInterceptorConfig)
        .config(Others)
        .constant('APP_UAUTH', {key: 'uAuthInfoguia'})
        .run(AppRun);

/*@ngInject*/
function AppRun($rootScope, $filter, $state, $document, $location, $log, AuthSvc) {

    $rootScope.$currentDate = new Date();
    $rootScope.$state = $state;
    $rootScope.$location = $location;
    $rootScope.$appGmapref = 'https://maps.googleapis.com/maps/api/js';
    $rootScope.$appUser = AuthSvc.appUser();
    $rootScope.$settings = {
      'noImage': 'app/assets/img/no-thumbnail.jpg'  
    };

    var _allow = [
        'auth.login',
        'auth.logout',
        'auth.reset',
        'auth.resetpassword'
    ];

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.previousStateName = fromState.name;
        $rootScope.previousStateParams = fromParams;
        $rootScope.currentStateParams = toParams;
        $rootScope.currentState = toState;
        $rootScope.pageTitle = toState.data.pageTitle;
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log(unfoundState.to);
        console.log(unfoundState.toParams);
        console.log(unfoundState.options);
    });

}

/*@ngInject*/
function TestingInterceptorConfig($httpProvider) {

    $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    var token = localStorageService.get('bearer') || null;
                    if (token)
                        config.headers.Authorization = 'Bearer ' + token;

                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/auth/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
}

/*@ngInject*/
function CompileProviderConfig($compileProvider, ENV) {

    if (ENV === 'dev')
        $compileProvider.debugInfoEnabled(true);
    else
        $compileProvider.debugInfoEnabled(false);
}

function Others($httpProvider) {

    $httpProvider.defaults.headers.common = "Accept: application/json, text/plain, *﻿/﻿*";
}

