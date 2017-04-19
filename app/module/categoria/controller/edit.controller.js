(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaEditController', CategoriaEditController);

    /*@ngInject*/
    function CategoriaEditController($scope, $state, $stateParams, CategoriaSvc, AppNomenclatorSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel
        };

        vm.model = {};
        
        vm.data = {
            grupoCategorias:[]
        };

        vm.init();

        //Functions

        function Init() {
            
            AppNomenclatorSvc.getNomenclador('GRUPO_CATEGORIA').then(function(data){                
                vm.data.grupoCategorias = data;    
                console.log(data);
            }, function(err){
                console.log(err);
            })            
            
            CategoriaSvc.getById($stateParams.id).then(function (data) {
                vm.model = data;
            }, function (err) {
                alert(err);
            });            
        }

        function saveModel(isValid) {

            if (!isValid) {
                alert('Revise los datos dle formulario...');
                return;
            }

            CategoriaSvc.update(vm.model).then(function (data) {
                $state.go('cliente.list');
            }, function (err) {
                alert(err);
            });
        }
    }

})();

