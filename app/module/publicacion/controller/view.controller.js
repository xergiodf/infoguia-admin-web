(function(){
    
    "use strict";
    
    angular.module('publicacion.module')
            .controller('PublicacionViewController', PublicacionViewController);
    
    /*@ngInject*/
    function PublicacionViewController($scope){
        
        var vm = this;
        
        vm.init = Init;
        
        vm.publicacion = {};
        
        vm.fn = {
            
        };
        
        
        vm.init();
        
        //Functions
        
        function Init(){            
            
        }
    }
    
})();

