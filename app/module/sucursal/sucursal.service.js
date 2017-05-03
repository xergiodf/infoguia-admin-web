(function () {

    "use strict";

    angular.module('sucursal.module')
            .service('SucursalSvc', SucursalSvc);

    function SucursalSvc($http, $q, API_INFOGUIA, Upload) {

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
                        url: url
                                /*transformResponse: appendTransform($http.defaults.transformResponse, function (value) {
                                 return doTransform(value);
                                 })*/
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

                    if (!modelID) {
                        reject("Id de cliente no establecido...");
                        return;
                    }

                    $http({
                        method: "GET",
                        url: url,
                        /*transformResponse: appendTransform($http.defaults.transformResponse, function (value) {
                         return doTransform(value);
                         })*/
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
            },
            removeImage: function (id) {

                function promise(resolve, reject) {

                    resolve("Imagen eliminada...");
                    return;

                    var url = API_SUCURSAL + 'removeimage';

                    $http({
                        method: 'POST',
                        url: url,
                        data: {id: id}
                    }).then(successResponse, errorResponse);

                    function successResponse(response) {
                        resolve(response.data);
                    }

                    function errorResponse(response) {
                        reject("Ha ocurrido un error mientras se eliminaba la imagen. " + response.statusText);
                    }
                }

                return $q(promise);
            },
            uploadImage: function (file, pid) {

                var id = pid || null;

                function promise(resolve, reject) {

                    var url = API_SUCURSAL + 'upload/' + id;

                    if (file && id !== null) {

                        Upload.upload({
                            url: url,
                            data: {fileData: file, id: id}
                        }).then(function (resp) {
                            console.log('Success ' + resp.config.data.fileData.name + 'uploaded. Response: ' + resp.data);
                            resolve(resp.config.data.fileData);
                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                            reject('Error status: ' + resp.status);
                        }, function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.fileData.name);
                        });
                    } else {
                        reject("Error intentando subir la image de la sucursal.");
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


