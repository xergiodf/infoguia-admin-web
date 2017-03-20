(function(){
    
    "use strict";
    
    angular.module('cliente.module')
            .controller('ClienteViewController', ClienteViewController);
    
    /*@ngInject*/
    function ClienteViewController($scope){
        
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

