(function () {

    "use strict";

    angular.module('sucursal.module')
            .service('SucursalSvc', SucursalSvc);

    function SucursalSvc($http, $q, API_INFOGUIA) {

        var API_SUCURSAL = API_INFOGUIA + '/sucursales/';

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            return defaults.concat(transform);
        }

        function doTransform(value) {
            return value.map(function (item) {
                return new SUCURSAL(item);
            });
        }

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_SUCURSAL + 'add';

                    $http({
                        method: 'POST',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se creaba la sucursal. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            query: function () {

                function promise(resolve, reject) {

                    var url = API_SUCURSAL + 'find/all';

                    function appendTransform(defaults, transform) {
                        defaults = angular.isArray(defaults) ? defaults : [defaults];
                        return defaults.concat(transform);
                    }

                    function doTransform(value) {
                        return value.map(function (item) {
                            return new SUCURSAL(item);
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

                    var url = API_SUCURSAL + 'find/' + modelID;

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(new SUCURSAL(response.data));
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo sucursal...");
                    }
                }

                return $q(promise);
            },
            getByCliente: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_SUCURSAL + 'findByCliente/' + modelID;

                    if(!modelID){
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
                        reject(response.statusText + " Err obteniendo sucursal...");
                    }
                }

                return $q(promise);
            },
            update: function (model) {
                function promise(resolve, reject) {

                    var url = API_SUCURSAL + 'update';

                    $http({
                        method: 'PUT',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se actualizaba los datos de la sucursal. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            delete: function (id) {
                function promise(resolve, reject) {

                    var url = API_SUCURSAL + 'delete/' + id;

                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se eliminaba la sucursal. " + response.statusText);
                    }
                }

                return $q(promise);
            }
        };

        return service;

    }

    function SUCURSAL(model) {
        this.id = model.id || null;
        this.nombreSucursal = model.nombreSucursal || null;
        this.direccionFisica = model.direccionFisica || null;
        this.coordenadas = model.coordenadas || null;
        this.telefonos = model.telefonos || null;
        this.emails = model.emails || null;
        this.clienteDto = model.clienteDto || {};
    }

})();


