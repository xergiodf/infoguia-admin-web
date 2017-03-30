(function(){
    
    "use strict";
    
    angular.module('usuario.module')
            .controller('UsuarioViewController', UsuarioViewController);
    
    /*@ngInject*/
    function UsuarioViewController($scope){
        
        var vm = this;
        
        vm.init = Init;
        
        vm.cliente = {};
        
        vm.fn = {
            
        };
        
        
        vm.init();
        
        //Functions
        
        function Init(){            
            
        }
    }
    
})();

