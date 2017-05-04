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
            addMarker: addMarker,
            removeImage: function (id) {
                SucursalSvc.removeImage().then(function (data) {
                    alert(data);
                }, function (err) {
                    console.log(err);
                })
            },
            uploadFiles: function ($files) {
                if ($files && $files.length) {

                    var log = [];
                    angular.forEach($files, function (value, key) {
                        SucursalSvc.uploadImage(value, vm.sucursal.id).then(function (data) {
                            vm.sucursal.archivos.push(data);
                        }, function (err) {
                            console.log(err);
                        })
                    }, log);
                }
            }
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
                $state.go('cliente.edit', {id: vm.sucursal.clienteDto.id})
            }, function (err) {
                alert(err);
            })
        }

        function loadModel(modelID) {
            if (!modelID)
                return;

            SucursalSvc.get(modelID).then(function (data) {
                vm.sucursal = data;
                vm.sucursal['archivos'] = data.archivos !== null ? data.archivos : [];
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

