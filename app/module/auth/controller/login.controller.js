(function () {

    "use strict";

    angular.module('app.auth')
            .controller('LoginController', LoginController);

    /*@ngInject*/
    function LoginController($state, $rootScope, $http, $q, localStorageService, AuthSvc, APP_UAUTH) {

        var vm = this;

        vm.data = {
            username: "",
            password: "",
            rememberMe: false
        };
        
        vm.init = Init;

        vm.processing = {
            login: false
        };

        vm.fn = {
            login: login
        };

        vm.init();

        function Init() {
            AuthSvc.logout().then(function(response){
                
            }, function(err){
                
            })
        }

        function login() {
            AuthSvc.attemptLogin(vm.data).then(function (response) {

                var auth = response;

                var uAuthenticated = {
                    username: auth.username,
                    rol: auth.tipoUsuarioDto,
                    fechaRegistro: auth.fechaRegistro,
                    nombres: auth.nombres,
                    apellidos: auth.apellidos
                };
                
                //console.log(uAuthenticated);

                localStorageService.set('bearer', auth.tokenAuth);
                localStorageService.set(APP_UAUTH.key, uAuthenticated);
                $rootScope.$appUser = uAuthenticated;
                $state.transitionTo('cliente.list', null, {reload: true, inherit: false, notify: true});
            }, function (reason) {
                alert("Usuario o contraseña inválido");
            });
        }        
    }

})();




