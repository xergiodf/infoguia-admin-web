(function () {

    "use strict";

    angular.module('usuario.module')
            .controller('UsuarioListController', UsuarioListController);

    /*@ngInject*/
    function UsuarioListController(UsuarioSvc, $state) {

        var vm = this;

        vm.init = Init;

        vm.filter = {
            nombre_completo: "",
            nombre_corto: "",
            fecha_alta: "",
            fecha_inicio: "",
            search:""
        };

        vm.list = [];
        
        vm.fn = {
          goToEdit: goToEdit,
          goToView: goToView,
          goToDelete: goToDelete
        };

        vm.init();

        function Init() {
            UsuarioSvc.query().then(function (data) {
                vm.list = data;               
            }, function (err) {
                alert(err);
            })
        }
        
        function goToEdit(id){
            $state.go('usuario.edit', {id:id});
        }
        
        function goToView(id){
            
        }  
        
        function goToDelete(id){
            var msg = confirm("Está seguro que desea eliminar este cliente");
            if(!msg)
                return;
            
            UsuarioSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })             
        }          

    }

})();

