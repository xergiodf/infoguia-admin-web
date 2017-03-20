(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteSucursalController', ClienteSucursalController);

    /*@ngInject*/
    function ClienteSucursalController($stateParams, SucursalSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            sucursales: []
        };

        vm.fn = {
            saveModel: saveModel,
            displayView: displayView,
            goToEditSucursal: goToEditSucursal,
            goToViewSucursal: goToViewSucursal,
            goToDeleteSucursal: goToDeleteSucursal
        };

        vm.display_sucursal = {
            list: true,
            create: false,
            edit: false,
            view: false
        };

        vm.edit_sucursal = {};

        vm.create_sucursal = {};

        vm.view_sucursal = {};

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
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            SucursalSvc.query().then(function (data) {
                vm.data.sucursales = data;
            }, function (err) {
                alert("Err (" + err + ")");
            });
        }

        function displayView(action) {
            for (var prop in vm.display_sucursal)
                if (prop !== action)
                    vm.display_sucursal[prop] = false;

            vm.display_sucursal[action] = true;
        }

        function goToEditSucursal(id) {

            vm.fn.displayView('edit');

            SucursalSvc.get(id).then(function (data) {
                vm.edit_sucursal = data;
            }, function (err) {
                alert(err);
            })
        }

        function goToViewSucursal(id) {

            vm.fn.displayView('view');

            SucursalSvc.get(id).then(function (data) {
                vm.view_sucursal = data;
            }, function (err) {
                alert(err);
            })
        }

        function goToDeleteSucursal(id) {
            alert('delete');
        }

    }

})();

