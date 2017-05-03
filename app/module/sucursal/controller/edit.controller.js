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
                    console.log($files);
                    var log = [];
                    angular.forEach($files, function (value, key) {
                        SucursalSvc.uploadImage(value, vm.sucursal.id).then(function (data) {
                            vm.data.imagenes.push({id: value.lastModified, url: null, file: data});
                        }, function (err) {
                            console.log(err);
                        })
                    }, log);
                }
            }
        };

        vm.sucursal = {};

        vm.data = {
            imagenes: [
                {id: 1, url: null},
                {id: 2, url: null},
                {id: 3, url: null},
                {id: 4, url: null}
            ]
        };

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

            SucursalSvc.update(vm.sucursal).then(function (data) {
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
            }, function (err) {
                alert(err);
            })
        }

        function initSucursal() {
            vm.sucursal = {
                nombreSucursal: '',
                direccionFisica: '',
                coordenadas: '',
                clienteDto: {},
                telefonos: '',
                emails: ''
            };
        }

        function addMarker(event) {
            var ll = event.latLng;
            vm.sucursal.coordenadas = ll.lat() + '|' + ll.lng();
        }
    }

})();

