(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteCreateController', ClienteCreateController);

    /*@ngInject*/
    function ClienteCreateController($scope, ClienteSvc, $state) {

        var vm = this;

        vm.init = Init;

        vm.cliente = {
            codigo_cliente: "",
            nombre_completo: "",
            nombre_corto: "",
            description_completa: "",
            descripcion_corta: "",
            fecha_alta: "",
            fecha_inicio: ""
        };

        vm.fn = {
            saveModel: saveModel
        };


        vm.init();

        //Functions

        function Init() {

        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos del formulario...');
                return;
            }

            ClienteSvc.create(vm.cliente).then(function (data) {
                $state.go('cliente.edit', {id: data.id});
            }, function (err) {
                alert(err);
            })
        }

    }

})();

