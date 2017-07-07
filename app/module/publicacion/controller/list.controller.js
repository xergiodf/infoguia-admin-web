(function () {

    "use strict";

    angular.module('publicacion.module')
            .controller('PublicacionListController', PublicacionListController);

    /*@ngInject*/
    function PublicacionListController(PublicacionSvc, $state) {

        var vm = this;

        vm.init = Init;

        vm.filter = {
            titulo: "",
            descripcion: "",
            fecha_creacion: "",
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
            PublicacionSvc.query().then(function (data) {
                vm.list = data;   
            }, function (err) {
                alert(err);
            })
        }
        
        function goToEdit(id){
            $state.go('publicacion.edit', {id:id});
        }
        
        function goToView(id){
            alert('not implemented yet');
        }  
        
        function goToDelete(id){
            var msg = confirm("Está seguro que desea eliminar este publicación.");
            if(!msg)
                return;
            
            PublicacionSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })             
        }          

    }

})();

