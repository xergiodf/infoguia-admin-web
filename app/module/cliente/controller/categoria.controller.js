(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteCategoriaController', ClienteCategoriaController);

    /*@ngInject*/
    function ClienteCategoriaController($scope, $state, $stateParams, CategoriaSvc, ClienteSvc, ClienteCategoriaSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            categorias: [],
            clienteCategorias:[]
        };

        vm.fn = {
            goToCreate: goToCreate,
            goToEdit: goToEdit,
            goToDelete: goToDelete,
            deleteModel: deleteModel
        };

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            ClienteCategoriaSvc.getByClienteId(clienteID).then(function(data){
                vm.data.clienteCategorias = data;
            }, function(err){
                console.log(err);
            });    

            CategoriaSvc.query().then(function (data) {
                console.log(data);
                vm.data.categorias = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }

        function goToCreate() {
            $state.go('categoria.create');
        }

        function goToEdit(id) {
            $state.go('sucursal.edit', {id: id});
        }

        function goToDelete(id) {
            var msg = confirm("Esta seguro que desea eliminar esta categoría de cliente?");
            if (!msg)
                return;

            vm.fn.deleteModel(id);
        }

        function deleteModel(id) {
            ClienteSvc.deleteCategoria(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            });
        }
    }

})();

