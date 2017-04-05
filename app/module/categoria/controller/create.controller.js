(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaCreateController', CategoriaCreateController);

    /*@ngInject*/
    function CategoriaCreateController($scope, $state, $stateParams, CategoriaSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel
        };

        vm.model = {};

        vm.init();

        //Functions

        function Init() {
            vm.model = new CATEGORIA({});
        }

        function saveModel(isValid) {

            if (!isValid) {
                alert('Revise los datos dle formulario...');
                return;
            }

            CategoriaSvc.create(vm.model).then(function (data) {
                $state.go('cliente.list');
            }, function (err) {
                alert(err);
            });
        }
    }
    
    function CATEGORIA(model) {
        this.id = model.id || null;
        this.descripcion = model.descripcion || null;
    }    

})();

