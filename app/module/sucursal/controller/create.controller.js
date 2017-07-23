(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalClienteCreateController', SucursalClienteCreateController);

    /*@ngInject*/
    function SucursalClienteCreateController($scope, $state, $stateParams, SucursalSvc, ClienteSvc, AppGeoPositionSvc, AppNomenclatorSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            departamento: [],
            ciudad: [],
            ciudad_copy: []
        };

        vm.fn = {
            saveModel: saveModel,
            addMarker: addMarker,
            selectDepa: selectDepa
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

                if (vm.file != null) {
                    SucursalSvc.uploadImage(vm.file, data.id).then(function (file) {
                        $state.go('sucursal.edit', {id: data.id});
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    $state.go('sucursal.edit', {id: data.id});
                }

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

        function initSucursal() {
            vm.sucursal = {
                nombreSucursal: '',
                direccionFisica: '',
                coordenadas: '',
                clienteDto: {},
                telefonos: '',
                emails: '',
                ciudadDto: {}
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

