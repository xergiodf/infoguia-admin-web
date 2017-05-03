(function () {

    "use strict";

    angular.module('usuario.module')
            .controller('ProfileCreateController', ProfileCreateController);

    /*@ngInject*/
    function ProfileCreateController($scope, $state, UsuarioSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {

        };

        vm.model = {
        };

        vm.data = {

        };

        vm.init();

        //Functions

        function Init() {

        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos del formulario...');
                return;
            }
        }
    }

})();

