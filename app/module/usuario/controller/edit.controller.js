(function(){
    
    "use strict";
    
    angular.module('usuario.module')
            .controller('UsuarioEditController', UsuarioEditController);
    
    /*@ngInject*/
    function UsuarioEditController($state, $stateParams, UsuarioSvc, AppNomenclatorSvc){
        
        var vm = this;
        
        vm.init = Init;
        
        vm.usuario = {};   
        
        vm.data = {
            tipoUsuario:[],
            estadoUsuario:[]
        };
        
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
           
            UsuarioSvc.update(vm.usuario).then(function (data) {
                $state.go('cliente.list');
            }, function (err) {
                console.log(err);
            })            
        }
        
        function loadModel(id){
            if(!id)
                return;
            
            AppNomenclatorSvc.getNomenclador('TIPO_USUARIO').then(function(data){
                vm.data.tipoUsuario = data;
            }, function(err){
                console.log(err);
            });
            
            AppNomenclatorSvc.getNomenclador('ESTADO_USUARIO').then(function(data){
                vm.data.estadoUsuario = data;
            }, function(err){
                console.log(err);
            });            
            
            UsuarioSvc.getById(id).then(function(data){
                vm.usuario = data;
            },
            function(err){
                console.log("Err ("+ err +")");
            })            
        }        
    }
    
})();

