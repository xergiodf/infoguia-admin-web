(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClientePublicacionController', ClientePublicacionController);

    /*@ngInject*/
    function ClientePublicacionController($scope, $state, $stateParams, PublicacionSvc) {

        var vm = this;

        vm.init = Init;

        vm.data = {
            list: []
        };

        vm.fn = {
            goToCreate: goToCreate,
            goToEdit: goToEdit,
            goToView: goToView,
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

            PublicacionSvc.getByCliente(clienteID).then(function (data) {
                vm.data.list = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }

        function goToCreate() {
            var idcliente = $scope.$parent.vm.cliente.id;
            $state.go('publicacion.create', {id:idcliente});
        }

        function goToEdit(id) {
            $state.go('publicacion.edit', {id: id});
        }

        function goToView(id) {
            $state.go('publicacion.view', {id: id});
        }

        function goToDelete(id) {
            var msg = confirm("Esta seguro que desea eliminar esta publicación?");
            if (!msg)
                return;

            vm.fn.deleteModel(id);
        }

        function deleteModel(id) {
            PublicacionSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            });
        }
    }

})();

