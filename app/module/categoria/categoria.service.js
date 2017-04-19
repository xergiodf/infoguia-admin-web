(function () {

    "use strict";

    angular.module('categoria.module')
            .service('CategoriaSvc', CategoriaSvc);

    function CategoriaSvc($http, $q, API_INFOGUIA) {

        var API_MODEL_URL = API_INFOGUIA + '/categorias/';

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            return defaults.concat(transform);
        }

        function doTransform(value) {
            if (value) {
                return value.map(function (item) {
                    return new CATEGORIA(item);
                });
            } else {
                return value;
            }
        }

        var service = {
            create: function (model) {

                function promise(resolve, reject) {

                    var url = API_MODEL_URL + 'add';
                    $http({
                        method: 'POST',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se creaba la categoría. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            query: function () {

                function promise(resolve, reject) {

                    var url = API_MODEL_URL + 'find/all';

                    $http({
                        method: "GET",
                        url: url,
                        transformResponse: appendTransform($http.defaults.transformResponse, function (value) {
                            return doTransform(value);
                        })
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        console.log(response);
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Error obteniendo listado de categorias...");
                    }
                }

                return $q(promise);
            },
            getById: function (id) {

                var modelID = id || null;

                function promise(resolve, reject) {

                    var url = API_MODEL_URL + 'find/' + modelID;

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(new CATEGORIA(response.data));
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo categoria...");
                    }
                }

                return $q(promise);
            },
            update: function (model) {
                function promise(resolve, reject) {

                    var url = API_MODEL_URL + 'update';

                    $http({
                        method: 'PUT',
                        url: url,
                        data: model
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se actualizaba los datos de la Categoría. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            delete: function (id) {
                function promise(resolve, reject) {

                    var url = API_MODEL_URL + 'delete/' + id;

                    $http({
                        method: 'DELETE',
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se eliminaba la Categoria. " + response.statusText);
                    }
                }

                return $q(promise);
            }
        };

        return service;

    }

    function CATEGORIA(model) {
        this.id = model.id || null;
        this.descripcion = model.descripcion || null;
        this.grupoCategoriaDto = model.grupoCategoriaDto || {};
    }

})();


