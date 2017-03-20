(function () {

    "use strict";

    angular.module('cliente.module')
            .service('ClienteSvc', ClienteSvc);

    function ClienteSvc($http, $q, $filter, API_INFOGUIA) {

        var API_CLIENTE = API_INFOGUIA + '/clientes/';

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'add';

                    $http({
                        method: 'POST',
                        url: url,
                        data: {
                            coordenadas: model.coordenadas,
                            descripcionCompleta: model.descripcion_completa,
                            descripcionCorta: model.descripcion_corta,
                            direccionFisica: model.direccion_fisica,
                            fechAlta: model.fech_alta,
                            fechaInicio: model.fecha_inicio,
                            horarios: model.horarios,
                            nombreCompleto: model.nombre_completo,
                            nombreCorto: model.nombre_corto,
                            nombreSucursal: model.nombre_sucursal,
                            telefono: model.telefono
                        }
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se creaba el cliente. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            query: function () {

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'find/all';

                    function appendTransform(defaults, transform) {
                        defaults = angular.isArray(defaults) ? defaults : [defaults];
                        return defaults.concat(transform);
                    }

                    function doTransform(value) {
                        return value.map(function (item) {
                            return new CLIENTE(item);
                        });
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
            get: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'find/' + modelID;

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(new CLIENTE(response.data));
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo cliente...");
                    }
                }

                return $q(promise);
            },
            getById: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'find/' + modelID;

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo cliente...");
                    }
                }

                return $q(promise);
            },            
            update: function (model) {

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'update';

                    $http({
                        method: 'PUT',
                        url: url,
                        data: {
                            coordenadas: model.coordenadas,
                            descripcionCompleta: model.descripcion_completa,
                            descripcionCorta: model.descripcion_corta,
                            direccionFisica: model.direccion_fisica,
                            fechAlta: model.fech_alta,
                            fechaInicio: model.fecha_inicio,
                            horarios: model.horarios,
                            nombreCompleto: model.nombre_completo,
                            nombreCorto: model.nombre_corto,
                            nombreSucursal: model.nombre_sucursal,
                            telefono: model.telefono
                        }
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se actualizaba el cliente. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            delete: function (id) {

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'delete/' + id;

                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se actualizaba el cliente. " + response.statusText);
                    }
                }

                return $q(promise);
            }
        };

        return service;

    }

    function CLIENTE(model) {
        this.id = model.id || null;
        this.coordenadas = model.coordenadas || null;
        this.descripcion_completa = model.descripcionCompleta || null;
        this.descripcion_corta = model.descripcionCorta || null;
        this.direccion_fisica = model.direccionFisica || null;
        this.fech_alta = model.fechAlta || null;
        this.fecha_inicio = model.fechaInicio || null;
        this.horarios = model.horarios || null;
        this.nombre_completo = model.nombreCompleto || null;
        this.nombre_corto = model.nombreCorto || null;
        this.nombre_sucursal = model.nombreSucursal || null;
        this.telefono = model.telefono || null;
    }

})();


