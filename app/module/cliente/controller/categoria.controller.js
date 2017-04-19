(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteCategoriaController', ClienteCategoriaController);

    /*@ngInject*/
    function ClienteCategoriaController($log, $scope, $state, $stateParams, CategoriaSvc, ClienteCategoriaSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            categorias: [],
            clienteCategorias: []
        };

        vm.fn = {
            goToCreate: goToCreate,
            goToEdit: goToEdit,
            goToDelete: goToDelete,
            deleteModel: deleteModel,
            addCategoriaCliente: addCategoriaCliente,
            deleteCategoriaCliente: deleteCategoriaCliente
        };

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            ClienteCategoriaSvc.getByClienteIdResume(clienteID).then(function (data) {                
               vm.data.clienteCategorias = data.clienteCategorias;
               vm.data.categorias = data.categorias;
            }, function (err) {
                $log.error(err);
            });
        }

        function goToCreate() {
            $state.go('categoria.create');
        }

        function goToEdit(id) {
            $state.go('categoria.edit', {id: id});
        }

        function goToDelete(id) {
            var msg = confirm("Esta seguro que desea eliminar esta categoría de cliente?");
            if (!msg || !id)
                return;

            vm.fn.deleteModel(id);
        }

        function deleteModel(id) {
            CategoriaSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            });
        }

        function addCategoriaCliente(item) {

            var data = {
                categoriaDto: item,
                clienteDto: $scope.$parent.vm.cliente
            };
            
            ClienteCategoriaSvc.create(data).then(function (result) {
                vm.init();
            }, function (err) {
                console.log(err);
            });
        }

        function deleteCategoriaCliente(item) {
            
            ClienteCategoriaSvc.delete(item).then(function (data) {
                vm.init();
            }, function (err) {
                console.log(err);
            });            
            
        }
    }

})();

