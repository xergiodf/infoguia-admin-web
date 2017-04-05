(function () {

    "use strict";

    angular.module('cliente.module')
            .service('ClienteSvc', ClienteSvc)
            .service('ClienteCategoriaSvc', ClienteCategoriaSvc);

    function ClienteSvc($http, $q, API_INFOGUIA) {

        var API_CLIENTE = API_INFOGUIA + '/clientes/';

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_CLIENTE + 'add';

                    var data = {
                        descripcionCompleta: model.descripcionCompleta || null,
                        descripcionCorta: model.descripcionCorta || null,
                        direccionFisica: model.direccionFisica || null,
                        fechAlta: model.fechAlta || null,
                        fechaInicio: model.fechaInicio || null,
                        nombreCompleto: model.nombreCompleto || null,
                        nombreCorto: model.nombreCorto || null
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
                        if (value) {
                            return value.map(function (item) {
                                return new CLIENTE(item);
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
                            id: model.id,
                            coordenadas: model.coordenadas,
                            descripcionCompleta: model.descripcionCompleta,
                            descripcionCorta: model.descripcionCorta,
                            direccionFisica: model.direccionFisica,
                            fechAlta: model.fechAlta,
                            fechaInicio: model.fechaInicio,
                            horarios: model.horarios,
                            nombreCompleto: model.nombreCompleto,
                            nombreCorto: model.nombreCorto,
                            nombreSucursal: model.nombreSucursal,
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
                        reject("Ha ocurrido un error mientras se eliminaba el cliente. " + response.statusText);
                    }
                }

                return $q(promise);
            }
        };

        return service;

    }

    function ClienteCategoriaSvc($http, $q, $filter, API_INFOGUIA, CategoriaSvc) {

        var API_MODEL = API_INFOGUIA + '/clienteCategorias/';

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            return defaults.concat(transform);
        }

        function doTransform(value) {
            if (value) {
                return value.map(function (item) {
                    return new CLIENTE_CATEGORIA(item);
                });
            } else {
                return value;
            }
        }

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_MODEL + 'add';

                    var data = {
                        categoriaDto: model.categoriaDto,
                        clienteDto: model.clienteDto
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
                        reject("Ha ocurrido un error mientras se creaba una categoria de cliente. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            getByClienteId: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_MODEL + 'findByCliente/' + modelID;

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
                        reject(response.statusText + " Err getByClienteId...");
                    }
                }

                return $q(promise);
            },
            getByCategoriaId: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_MODEL + 'findByCategoria/' + modelID;

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
                        reject(response.statusText + " Err getByCategoriaId...");
                    }
                }

                return $q(promise);
            },
            delete: function (model) {

                function promise(resolve, reject) {

                    var url = API_MODEL + 'delete';

                    $http({
                        method: 'DELETE',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            getByClienteIdResume: function (id) {

                function promise(resolve, reject) {

                    service.getByClienteId(id)
                            .then(function (data) {
                                return $q(function (res, rej) {
                                    res(data);
                                });
                            }).then(function (data) {

                        CategoriaSvc.query().then(function (rcategories) {
                            var categories = rcategories;
                            var ccliente = data;

                            var arrCategories = [];

                            for (var i = 0; i < categories.length; i++) {

                                var found = false;
                                var cat = categories[i];

                                for (var j = 0; i < ccliente.length; i++) {
                                    var catCliente = ccliente[j];

                                    var catClienteID = catCliente['categoriaDto']['id'];
                                    var catID = cat['id'];

                                    if (catClienteID === catID)
                                        found = true;
                                }
                                
                                if (!found) {
                                    arrCategories.push(cat);
                                }
                            }

                            resolve({categorias: arrCategories, clienteCategorias: ccliente});

                        });

                    }, function (err) {
                        reject(err);
                    });
                }

                return $q(promise);
            }
        };

        return service;

    }

    function CLIENTE(model) {
        this.id = model.id || null;
        this.descripcionCompleta = model.descripcionCompleta || null;
        this.descripcionCorta = model.descripcionCorta || null;
        this.direccionFisica = model.direccionFisica || null;
        this.fechAlta = model.fechAlta || null;
        this.fechaInicio = model.fechaInicio || null;
        this.nombreCompleto = model.nombreCompleto || null;
        this.nombreCorto = model.nombreCorto || null;
    }

    function CLIENTE_CATEGORIA(model) {
        this.categoriaDto = model.categoriaDto || {};
        this.clienteDto = model.clienteDto || {};
    }

})();


