(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaCreateController', CategoriaCreateController);

    /*@ngInject*/
    function CategoriaCreateController($scope, $state, $stateParams, CategoriaSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {

        };

        vm.list = [];

        vm.init();

        //Functions

        function Init() {

        }
    }

})();

