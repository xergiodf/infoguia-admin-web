(function () {

    "use strict";

    angular.module('sucursal.module')
            .controller('SucursalInitCreateController', SucursalInitCreateController);

    /*@ngInject*/
    function SucursalInitCreateController($scope, $state, ClienteSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            goToCreate: goToCreate
        };

        vm.data = {
            clientes: []
        };

        vm.init();

        //Functions

        function Init() {
            loadClientes();
        }

        function loadClientes() {
            ClienteSvc.query().then(function (data) {
                vm.data.clientes = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }

        function goToCreate(clienteID) {
            if (!clienteID)
                return;

            $state.go('sucursal.create', {id: clienteID});
        }
    }

})();

