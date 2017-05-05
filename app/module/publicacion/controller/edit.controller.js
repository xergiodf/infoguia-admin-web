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
            saveModel: saveModel,
            removeImage: function (id) {
                PublicacionSvc.removeImage().then(function (data) {
                    alert(data);
                }, function (err) {
                    console.log(err);
                })
            },
            uploadFiles: function ($files) {
                if ($files && $files.length) {

                    var log = [];
                    angular.forEach($files, function (value, key) {
                        PublicacionSvc.uploadImage(value, vm.model.id).then(function (data) {
                            vm.model.archivos.push(data);
                        }, function (err) {
                            console.log(err);
                        })
                    }, log);
                }
            }
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
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos del formulario...');
                return;
            }

            var objectDto = angular.copy(vm.model);

            PublicacionSvc.update(objectDto).then(function (data) {

                $state.go('cliente.list');

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
                if (data['archivos'] == null)
                    modelTmp['archivos'] = [];

                vm.model = modelTmp;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }
    }

})();

