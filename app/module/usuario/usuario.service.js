(function () {

    "use strict";

    angular.module('usuario.module')
            .service('UsuarioSvc', UsuarioSvc);

    function UsuarioSvc($http, $q, $filter, API_INFOGUIA) {

        var API_USUARIO = API_INFOGUIA + '/usuarios/';

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_USUARIO + 'add';

                    var data = {
                        username: model.username || null,
                        password: model.password || null,
                        email: model.email || null,
                        estadoUsuarioDto: model.estadoUsuarioDto || null,
                        tipoUsuarioDto: model.tipoUsuarioDto || null
                    };

                    $http({
                        method: 'POST',
                        url: url,
                        data: data
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se creaba el usuario. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            query: function () {

                function promise(resolve, reject) {

                    var url = API_USUARIO + 'find/all';

                    function appendTransform(defaults, transform) {
                        defaults = angular.isArray(defaults) ? defaults : [defaults];
                        return defaults.concat(transform);
                    }

                    function doTransform(value) {
                        if (value) {
                            return value.map(function (item) {
                                return new USUARIO(item);
                            });
                        } else {
                            return value;
                        }
                    }

                    $http({
                        method: "GET",
                        url: url,
                        transformResponse: appendTransform($http.defaults.transformResponse, function (value) {
                            return doTransform(value);
                        })
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Error obteniendo listado de clientes...");
                    }
                }

                return $q(promise);
            },
            getById: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_USUARIO + 'find/' + modelID;

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo usuario...");
                    }
                }

                return $q(promise);
            },
            update: function (model) {

                function promise(resolve, reject) {

                    var url = API_USUARIO + 'update';

                    var data = {
                        id: model.id || null,
                        username: model.username || null,
                        password: model.password || null,
                        email: model.email || null,
                        estadoUsuarioDto: model.estadoUsuarioDto || null,
                        tipoUsuarioDto: model.tipoUsuarioDto || null
                    };

                    $http({
                        method: 'PUT',
                        url: url,
                        data: data
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se actualizaba el usuario. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            delete: function (id) {

                function promise(resolve, reject) {

                    var url = API_USUARIO + 'delete/' + id;

                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se eliminaba el usuario. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            perfil: function (id) {

                return $q(function (resolve, reject) {
                    $http.get('data/Perfil.json').then(function (response) {
                        resolve(response.data);
                    }, function (data) {
                        reject(data);
                    });
                })
            }
        };

        return service;

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


