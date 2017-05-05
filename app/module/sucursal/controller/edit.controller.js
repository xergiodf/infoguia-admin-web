(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalEditController', SucursalEditController);

    /*@ngInject*/
    function SucursalEditController($scope, $state, $stateParams, SucursalSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel,
            addMarker: addMarker
        };

        vm.sucursal = {
            nombreSucursal: '',
            direccionFisica: '',
            coordenadas: '',
            clienteDto: {},
            telefonos: '',
            emails: '',
            archivos: []
        };

        vm.data = {};

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos dle formulario...');
                return;
            }

            var dtoSucursal = angular.copy(vm.sucursal);
            dtoSucursal['archivos'] = null;

            SucursalSvc.update(dtoSucursal).then(function (data) {

                if (vm.file != null) {
                    SucursalSvc.uploadImage(vm.file, data.id).then(function (file) {
                    }, function (err) {
                        console.log("Ha ocurrido un error intentando guardar la imagen. ", err);
                    });
                } else {

                }
                $state.go('cliente.edit', {id: vm.sucursal.clienteDto.id});

            }, function (err) {
                alert(err);
            })
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

        function addMarker(event) {
            var ll = event.latLng;
            vm.sucursal.coordenadas = ll.lat() + '|' + ll.lng();
        }
    }

})();

