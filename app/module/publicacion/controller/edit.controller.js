(function () {

    "use strict";

    angular.module('publicacion.module')
            .controller('PublicacionEditController', PublicacionEditController);

    /*@ngInject*/
    function PublicacionEditController($state, $stateParams, $filter, PublicacionSvc, AppNomenclatorSvc, $log) {

        var vm = this;

        vm.init = Init;

        vm.model = {};

        vm.data = {
            tipoPublicacion: [],
            estadoPublicacion: []
        };

        vm.fn = {
            saveModel: saveModel
        };


        vm.init();

        //Functions

        function Init() {
            
            loadModel($stateParams.id);

            AppNomenclatorSvc.getNomenclador('TIPO_PUBLICACION')
                    .then(function (data) {
                        vm.data.tipoPublicacion = data;
                    }, function (err) {
                        $log.error(err);
                    });

            AppNomenclatorSvc.getNomenclador('ESTADO_PUBLICACION')
                    .then(function (data) {
                        vm.data.estadoPublicacion = data;
                    }, function (err) {
                        $log.error(err);
                    });
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos del formulario...');
                return;
            }

            PublicacionSvc.update(vm.model).then(function (data) {

                if (angular.isDefined(vm.publicacion) && vm.publicacion.imagen) {

                    PublicacionSvc.uploadImage(vm.publicacion.imagen, vm.model.id).then(function (data) {
                        $state.go('cliente.list');
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    $state.go('cliente.list');
                }

            }, function (err) {
                console.log(err);
            });
        }

        function loadModel(id) {
            if (!id)
                return;

            PublicacionSvc.get(id).then(function (data) {
                var modelTmp = data;
                modelTmp['fechaCreacion'] = new Date(data.fechaCreacion);
                modelTmp['fechaDesde'] = new Date(data.fechaDesde);
                modelTmp['fechaHasta'] = new Date(data.fechaHasta);
                vm.model = modelTmp;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }
    }

})();

