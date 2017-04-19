(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteListController', ClienteListController);

    /*@ngInject*/
    function ClienteListController(ClienteSvc, $state) {

        var vm = this;

        vm.init = Init;

        vm.filter = {
            nombreCompleto: "",
            nombreCorto: "",
            fechaAlta: "",
            fechaInicio: "",
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
            ClienteSvc.query().then(function (data) {
                vm.list = data;               
            }, function (err) {
                alert(err);
            })
        }
        
        function goToEdit(id){
            $state.go('cliente.edit', {id:id});
        }
        
        function goToView(id){
            
        }  
        
        function goToDelete(id){
            var msg = confirm("Está seguro que desea eliminar este cliente");
            if(!msg || !id)
                return;
            
            ClienteSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })             
        }          

    }

})();

