(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteSucursalController', ClienteSucursalController);

    /*@ngInject*/
    function ClienteSucursalController($scope, $state, $stateParams, SucursalSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            sucursales: []
        };

        vm.fn = {
            goToCreateSucursal: goToCreateSucursalCliente,
            goToEditSucursal: goToEditSucursal,
            goToViewSucursal: goToViewSucursal,
            goToDeleteSucursal: goToDeleteSucursal,
            deleteSucursal: deleteSucursal
        };

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            SucursalSvc.getByCliente(clienteID).then(function (data) {
                vm.data.sucursales = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }

        function goToCreateSucursalCliente() {
            var idcliente = $scope.$parent.vm.cliente.id;
            $state.go('sucursal.create', {id:idcliente});
        }

        function goToEditSucursal(id) {
            $state.go('sucursal.edit', {id: id});
        }

        function goToViewSucursal(id) {
            $state.go('sucursal.view', {id: id});
        }

        function goToDeleteSucursal(id) {
            var msg = confirm("Esta seguro que desea eliminar esta sucursal?");
            if (!msg)
                return;

            vm.fn.deleteSucursal(id);
        }

        function deleteSucursal(id) {
            SucursalSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            });
        }
    }

})();

