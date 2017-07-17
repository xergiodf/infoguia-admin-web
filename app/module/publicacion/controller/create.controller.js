(function () {

    "use strict";

    angular.module('publicacion.module')
            .controller('PublicacionCreateController', PublicacionCreateController);

    /*@ngInject*/
    function PublicacionCreateController($scope, $state, $stateParams, ClienteSvc, PublicacionSvc, AppNomenclatorSvc, $log) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            saveModel: saveModel
        };

        vm.publicacion = {};
        vm.model = {};

        vm.data = {
            tipoPublicacion: [],
            estadoPublicacion: [],
            cliente: []
        };

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);

            AppNomenclatorSvc.getNomenclador('TIPO_PUBLICACION', true)
                    .then(function (data) {
                        vm.data.tipoPublicacion = data;
                    }, function (err) {
                        $log.error(err);
                    });

            AppNomenclatorSvc.getNomenclador('ESTADO_PUBLICACION', true)
                    .then(function (data) {
                        vm.data.estadoPublicacion = data;
                    }, function (err) {
                        $log.error(err);
                    });

            ClienteSvc.query().then(function (data) {
                vm.data.cliente = data;
            }, function (err) {
                alert(err);
            })
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos dle formulario...');
                return;
            }

            var objectDto = angular.copy(vm.model);

            PublicacionSvc.create(objectDto).then(function (data) {
                $state.go('publicacion.edit', {id: data.id});
            }, function (err) {
                console.log(err);
            });
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            ClienteSvc.getById(clienteID).then(function (data) {
                vm.model['clienteDto'] = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }
    }

})();

