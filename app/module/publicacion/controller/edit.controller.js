(function(){
    
    "use strict";
    
    angular.module('publicacion.module')
            .controller('PublicacionEditController', PublicacionEditController);
    
    /*@ngInject*/
    function PublicacionEditController($state, $stateParams, PublicacionSvc){
        
        var vm = this;
        
        vm.init = Init;
        
        vm.publicacion = {};       
        
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
           
            PublicacionSvc.update(vm.publicacion).then(function (data) {
                $state.go('cliente.list');
            }, function (err) {
                console.log(err);
            })            
        }
        
        function loadModel(id){
            if(!id)
                return;
            
            PublicacionSvc.get(id).then(function(data){
                vm.publicacion = data;
            },
            function(err){
                console.log("Err ("+ err +")");
            })            
        }        
    }
    
})();

