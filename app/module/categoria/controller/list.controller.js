(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaListController', CategoriaListController);

    /*@ngInject*/
    function CategoriaListController($scope, $state, $stateParams, CategoriaSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            goToEdit: goToEdit,
            goToView: goToView,
            goToDelete: goToDelete
        };

        vm.categoria = {};

        vm.list = [];

        vm.init();

        //Functions

        function Init() {
            CategoriaSvc.query().then(function (data) {
                vm.list = data;
            }, function (err) {
                alert(err);
            });
        }

        function goToEdit(id) {
            $state.go('categoria.edit', {id: id});
        }

        function goToView(id) {
            alert('not implemented yet');
        }

        function goToDelete(id) {
            var msg = confirm("Está seguro que desea eliminar esta categoría");
            if (!msg || !id)
                return;

            CategoriaSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })
        }
    }

})();

