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

        vm.data = {
            tipoPublicacion: [],
            estadoPublicacion: []
        };

        vm.init();

        //Functions

        function Init() {
            loadModel($stateParams.id);
            loadData();
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos dle formulario...');
                return;
            }
            
            PublicacionSvc.create(vm.publicacion).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            });
        }

        function loadModel(clienteID) {
            if (!clienteID)
                return;

            vm.publicacion = new PUBLICACION({});

            ClienteSvc.getById(clienteID).then(function (data) {
                vm.publicacion['clienteDto'] = data;
            }, function (err) {
                console.log("Err (" + err + ")");
            });
        }

        function loadData() {

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

