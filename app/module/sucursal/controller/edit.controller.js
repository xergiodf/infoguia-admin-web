(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalEditController', SucursalEditController);

    /*@ngInject*/
    function SucursalEditController($scope, $state, $stateParams, SucursalSvc, AppNomenclatorSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel,
            addMarker: addMarker,
            selectDepa: selectDepa
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

        vm.data = {
            departamento: [],
            ciudad: [],
            ciudad_copy: []
        };

        vm.departamentoDto = {};

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
                if (data && data.ciudadDto != null && data.ciudadDto.departamentoDto != null)
                    vm.departamentoDto = data.ciudadDto.departamentoDto;
            }, function (err) {
                alert(err);
            });

            AppNomenclatorSvc.getNomenclador('DEPARTAMENTO', true).then(function (data) {
                vm.data.departamento = data;
            }, function (err) {
                console.log('departamento:', err);
            });

            AppNomenclatorSvc.getNomenclador('CIUDAD', true).then(function (data) {
                vm.data.ciudad = data;
                vm.data.ciudad_copy = data;
            }, function (err) {
                console.log('ciudad:', err);
            });
        }

        function addMarker(event) {
            var ll = event.latLng;
            vm.sucursal.coordenadas = ll.lat() + '|' + ll.lng();
        }

        function selectDepa(item) {
            vm.sucursal.ciudadDto = null;
            var depaCiudad = [];
            if (item && item != null) {
                if (vm.data.ciudad_copy.length > 0) {
                    vm.data.ciudad_copy.map(function (it, i) {
                        if (it['departamentoDto']['id'] == item.id)
                            depaCiudad.push(it);
                    })
                }
            }
            
            vm.data.ciudad = depaCiudad;
        }
    }

})();

