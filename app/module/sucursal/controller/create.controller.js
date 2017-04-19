(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalClienteCreateController', SucursalClienteCreateController);

    /*@ngInject*/
    function SucursalClienteCreateController($scope, $state, $stateParams, SucursalSvc, ClienteSvc, AppGeoPositionSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel,
            addMarker: addMarker
        };

        vm.sucursal = {};

        vm.init();

        //Functions

        function Init() {
            initSucursal();
            loadModel($stateParams.id);
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos dle formulario...');
                return;
            }

            SucursalSvc.create(vm.sucursal).then(function (data) {
                $state.go('cliente.edit', {id: vm.sucursal.clienteDto.id});
            }, function (err) {
                alert(err);
            });
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            ClienteSvc.getById(clienteID).then(function (data) {
                vm.sucursal['clienteDto'] = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }

        function initSucursal() {
            vm.sucursal = {
                nombreSucursal: '',
                direccionFisica: '',
                coordenadas: '',
                clienteDto: {},
                telefonos:'',
                emails:''
            };

            AppGeoPositionSvc.getCurrentPosition().then(function (response) {
                vm.sucursal.coordenadas = response.coords_v2;
            }, function (err) {
                alert(err);
            })
        }

        function addMarker(event) {
            var ll = event.latLng;
            vm.sucursal.coordenadas = ll.lat() + '|' + ll.lng();
        }
    }

})();

