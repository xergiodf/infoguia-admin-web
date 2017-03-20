(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteSucursalController', ClienteSucursalController);

    /*@ngInject*/
    function ClienteSucursalController($scope, $stateParams, SucursalSvc, ClienteSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            sucursales: []
        };

        vm.fn = {
            saveModel: saveModel,
            displayView: displayView,
            goToCreateSucursal: goToCreateSucursal,
            goToEditSucursal: goToEditSucursal,
            goToViewSucursal: goToViewSucursal,
            goToDeleteSucursal: goToDeleteSucursal,
            createSucursal: createSucursal,
            deleteSucursal: deleteSucursal,
            editSucursal: editSucursal
        };

        vm.display_sucursal = {
            list: true,
            create: false,
            edit: false,
            view: false
        };

        vm.edit_sucursal = {};

        vm.create_sucursal = {
            nombreSucursal: '',
            direccionFisica: '',
            coordenadas: '',
            clienteDto: {}
        };

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
            var msg = confirm("Esta seguro que desea eliminar esta sucursal?");
            if(!msg)
                return;
            
            vm.fn.deleteSucursal(id);
        }

        function goToCreateSucursal() {

            vm.fn.displayView('create');
            
            var idcliente = $scope.$parent.vm.cliente.id;            

            ClienteSvc.getById(idcliente).then(function (data) {                
                vm.create_sucursal['clienteDto'] = data;                   
            }, function (err) {
                alert("Err (" + err + ")");
            })
        }
        
        //ok
        function createSucursal(){           

            SucursalSvc.create(vm.create_sucursal).then(function (data) {
                vm.fn.displayView('list');
                vm.init();
            }, function (err) {
                alert(err);
            })            
        }
        
        function editSucursal(){           

            SucursalSvc.update(vm.edit_sucursal).then(function (data) {
                vm.fn.displayView('list');
                vm.init();
            }, function (err) {
                alert(err);
            })            
        }        
        
        function deleteSucursal(id){           

            SucursalSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })            
        }        

    }

})();

