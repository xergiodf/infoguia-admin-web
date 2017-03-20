(function () {

    "use strict";

    angular.module('sucursal.module')
            .service('SucursalSvc', SucursalSvc);

    function SucursalSvc($http, $q, $filter, API_INFOGUIA) {

        var API_SUCURSAL = API_INFOGUIA + '/sucursales/';

        var service = {
            create: function (model) {

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
                    $http({
                        method: "GET",
                        url: "data/sucursal.json"
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        if (modelID !== null) {
                            var resultado = $filter('filter')(response.data, {id_cliente: modelID});
                            if (resultado !== null && resultado.length > 0)
                                resolve(resultado);
                            else
                                resolve([]);
                        } else {
                            resolve(response.data);
                        }
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo sucursal por cliente...");
                    }
                }

                return $q(promise);
            },
            update: function (sucursal) {

            },
            remove: function (id) {
            }
        };

        return service;

    }
    
    function SUCURSAL(model){
        this.id = model.id || null;
        this.nombreSucursal = model.nombreSucursal || null;
        this.direccionFisica = model.direccionFisica || null;
        this.coordenadas = model.coordenadas || null;
        this.clienteDto = model.clienteDto || {};
    }

})();


