(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalViewController', SucursalViewController);

    /*@ngInject*/
    function SucursalViewController($scope, $stateParams, SucursalSvc) {

        var vm = this;

        vm.init = Init;

        vm.sucursal = {};

        vm.init();

        //Functions

        function Init() {
            initSucursal();
            loadModel($stateParams.id);
        }

        function loadModel(modelID) {
            if (!modelID)
                return;

            SucursalSvc.get(modelID).then(function (data) {
                vm.sucursal = data;
            }, function (err) {
                alert(err);
            })
        }

        function initSucursal() {
            vm.sucursal = {
                nombreSucursal: '',
                direccionFisica: '',
                coordenadas: '',
                clienteDto: {}
            };
        }

    }

})();

