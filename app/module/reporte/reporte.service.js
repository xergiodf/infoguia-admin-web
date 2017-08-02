(function () {

    "use strict";

    angular.module('reporte.module')
            .service('ReporteSvc', ReporteSvc);

    /*@ngInject*/        
    function ReporteSvc($http, $q, API_INFOGUIA) {

        var API_MODEL_URL = API_INFOGUIA + '/categorias/';

        var service = {
            query: function () {

                function promise(resolve, reject) {

                    var url = API_MODEL_URL + 'find/all';

                    $http({
                        method: "GET",
                        url: url
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
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
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject(response.statusText + " Err obteniendo categoria...");
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


