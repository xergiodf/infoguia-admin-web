(function () {

    "use strict";

    angular.module('usuario.module')
            .controller('ProfileEditController', ProfileEditController);

    /*@ngInject*/
    function ProfileEditController($scope, $stateParams, UsuarioSvc) {

        var vm = this;

        vm.init = Init;

        vm.model = {};

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);
        }

        function loadModel(modelID) {
            if (!modelID)
                return;

            UsuarioSvc.perfil().then(function (data) {
                vm.model = data;
            }, function (err) {
                console.log(err);
            });
        }
    }

})();

