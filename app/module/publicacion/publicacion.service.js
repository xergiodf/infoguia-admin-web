(function () {

    "use strict";

    angular.module('publicacion.module')
            .service('PublicacionSvc', PublicacionSvc);

    function PublicacionSvc($http, $q, $filter, API_INFOGUIA, $log) {

        var API_PUBLICACION = API_INFOGUIA + '/publicaciones/';

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            return defaults.concat(transform);
        }

        function doTransform(value) {
            if (value) {
                return value.map(function (item) {
                    return new PUBLICACION(item);
                });
            } else {
                return value;
            }
        }

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_PUBLICACION + 'add';

                    $http({
                        method: 'POST',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        $log.error(response);
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        $log.error(response);
                        reject("Ha ocurrido un error mientras se creaba la publicación. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            query: function () {

                function promise(resolve, reject) {

                    var url = API_PUBLICACION + 'find/all';

                    $http({
                        method: "GET",
                        url: url, //'data/cliente_publicaciones.json',
                        transformResponse: appendTransform($http.defaults.transformResponse, function (value) {
                            return doTransform(value);
                        })
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Error obteniendo listado de publicaciones...");
                    }
                }

                return $q(promise);
            },
            get: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_PUBLICACION + 'find/' + modelID;

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo publicación...");
                    }
                }

                return $q(promise);
            },
            getByCliente: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_PUBLICACION + 'findByCliente/' + modelID;

                    if (!modelID) {
                        reject("Id de cliente no establecido...");
                        return;
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
                        reject(response.statusText + " Err obteniendo publicación...");
                    }
                }

                return $q(promise);
            },
            update: function (model) {

                function promise(resolve, reject) {

                    var url = API_PUBLICACION + 'update';

                    $http({
                        method: 'PUT',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se actualizaban los datos de la publicación. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            delete: function (id) {

                function promise(resolve, reject) {

                    var url = API_PUBLICACION + 'delete/' + id;

                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error intentando eliminar la publicación. " + response.statusText);
                    }
                }

                return $q(promise);
            }
        };

        return service;

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


