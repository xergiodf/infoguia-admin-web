(function () {

    "use strict";

    angular.module('cliente.module')
            .controller('ClienteCreateController', ClienteCreateController);

    /*@ngInject*/
    function ClienteCreateController($scope, ClienteSvc, $state) {

        var vm = this;

        vm.init = Init;

        vm.cliente = {};

        vm.fn = {
            saveModel: saveModel
        };


        vm.init();

        //Functions

        function Init() {
            vm.cliente = new CLIENTE({});
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

    function CLIENTE(model) {
        this.id = model.id || null;
        this.descripcionCompleta = model.descripcionCompleta || null;
        this.descripcionCorta = model.descripcionCorta || null;
        this.direccionFisica = model.direccionFisica || null;
        this.fechAlta = model.fechAlta || null;
        this.fechaInicio = model.fechaInicio || null;
        this.horarios = model.horarios || null;
        this.nombreCompleto = model.nombreCompleto || null;
        this.nombreCorto = model.nombreCorto || null;
    }

})();

