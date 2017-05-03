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
            estadoPublicacion: []
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
                alert('Revise los datos dle formulario...');
                return;
            }

            PublicacionSvc.create(vm.model).then(function (data) {

                if (angular.isDefined(vm.publicacion) && vm.publicacion.imagen) {
                    PublicacionSvc.uploadImage(vm.publicacion.imagen, data.id).then(function (data) {
                        $state.go('cliente.edit', {id: vm.model.clienteDto.id});
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    $state.go('cliente.edit', {id: vm.model.clienteDto.id});
                }

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

    function PUBLICACION(model) {
        this.id = model.id || null;
        this.titulo = model.titulo || null;
        this.dirImagen = model.dirImagen || 'http://dummyimage.com/247x214.png/dddddd/000000';
        this.botonAccion = model.botonAccion || null;
        this.descripcionCorta = model.descripcionCorta || null;
        this.fechaCreacion = model.fechaCreacion || null;
        this.fechaDesde = model.fechaDesde || null;
        this.fechaHasta = model.fechaHasta || null;
        this.clienteDto = model.clienteDto || {};
        this.tipoPublicacionDto = model.tipoPublicacionDto || {};
        this.estadoPublicacionDto = model.estadoPublicacionDto || {};
    }

})();

