(function () {

    "use strict";

    angular.module('usuario.module')
            .controller('UsuarioCreateController', UsuarioCreateController);

    /*@ngInject*/
    function UsuarioCreateController($log, $scope, $state, UsuarioSvc, ClienteSvc, AppNomenclatorSvc) {

        var vm = this;

        vm.init = Init;

        vm.usuario = {};
        
        vm.data = {
            tipoUsuario: [],
            estadoUsuario: []
        };        

        vm.fn = {
            saveModel: saveModel
        };


        vm.init();

        //Functions

        function Init() {
            loadData();
        }

        function saveModel(isValid) {
            if (!isValid) {
                alert('Revise los datos del formulario...');
                return;
            }

            UsuarioSvc.create(vm.usuario).then(function (data) {
                $state.go('usuario.edit', {id: data.id});
            }, function (err) {
                $log.error(err);
            });
        }
        
        function loadData() {
            
            vm.usuario = new USUARIO({});

            AppNomenclatorSvc.getNomenclador('TIPO_USUARIO')
                    .then(function (data) {
                        vm.data.tipoUsuario = data;
                    }, function (err) {
                        $log.error(err);
                    });

            AppNomenclatorSvc.getNomenclador('ESTADO_USUARIO')
                    .then(function (data) {
                        vm.data.estadoUsuario = data;
                    }, function (err) {
                        $log.error(err);
                    });
        }        
        
    }
    
    function USUARIO(model) {
        this.id = model.id || null;
        this.username = model.username || null;
        this.estadoUsuarioDto = model.estadoUsuarioDto || {};
        this.tipoUsuarioDto = model.tipoUsuarioDto || {};
        this.clienteDto = model.clienteDto || {};
        this.admin = model.admin || false;
        this.email = model.email || null;
        this.fechaRegistro = model.fechaRegistro || null;
    }    

})();

