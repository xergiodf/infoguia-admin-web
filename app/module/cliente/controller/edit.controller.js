(function(){
    
    "use strict";
    
    angular.module('cliente.module')
            .controller('ClienteEditController', ClienteEditController);
    
    /*@ngInject*/
    function ClienteEditController($state, $stateParams, ClienteSvc){
        
        var vm = this;
        
        vm.init = Init;
        
        vm.cliente = {};        
        
        vm.fn = {
            saveModel: saveModel
        };
        
        
        vm.init();
        
        //Functions
        
        function Init(){ 
            loadModel($stateParams.id);            
        }
        
        function saveModel(isValid){
            if(!isValid){
                alert('Revise los datos del formulario...');
                return;
            }              
           
            ClienteSvc.update(vm.cliente).then(function (data) {
                $state.go('cliente.list');
            }, function (err) {
                console.log(err);
            })            
        }
        
        function loadModel(id){
            if(!id)
                return;
            
            ClienteSvc.getById(id).then(function(data){
                vm.cliente = data;
            },
            function(err){
                console.log("Err ("+ err +")");
            })            
        }        
    }
    
})();

