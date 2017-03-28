(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalEditController', SucursalEditController);

    /*@ngInject*/
    function SucursalEditController($scope, $stateParams, SucursalSvc) {

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

            SucursalSvc.update(vm.sucursal).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })
        }

        function loadModel(modelID) {
            if (!modelID)
                return;

            SucursalSvc.get(modelID).then(function (data) {
                console.log(data);
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

        function addMarker(event) {
            var ll = event.latLng;
            vm.sucursal.coordenadas = ll.lat() + '|' + ll.lng();            
        }        
    }

})();

