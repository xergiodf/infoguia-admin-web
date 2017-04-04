(function () {

    "use strict";

    angular.module('categoria.module')
            .controller('CategoriaEditController', CategoriaEditController);

    /*@ngInject*/
    function CategoriaEditController($scope, $state, $stateParams, CategoriaSvc) {

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

