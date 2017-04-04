(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaListController', CategoriaListController);

    /*@ngInject*/
    function CategoriaListController($scope, $state, $stateParams, CategoriaSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {

        };

        vm.categoria = {};

        vm.init();

        //Functions

        function Init() {

        }
    }

})();

