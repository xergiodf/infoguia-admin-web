(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaCreateController', CategoriaCreateController);

    /*@ngInject*/
    function CategoriaCreateController($scope, $state, $stateParams, CategoriaSvc, AppNomenclatorSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel
        };
        
        vm.data = {
            grupoCategorias: []
        }

        vm.model = {};

        vm.init();

        //Functions

        function Init() {
            AppNomenclatorSvc.getNomenclador('GRUPO_CATEGORIA').then(function(data){                
                vm.data.grupoCategorias = data;                
            }, function(err){
                console.log(err);
            })
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
    
})();

