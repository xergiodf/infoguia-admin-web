(function ($) {

    "use strict";
    angular.module('app')
            .service('AppGeoPositionSvc', AppGeoPositionSvc)
            .service('AppNomenclatorSvc', AppNomenclatorSvc);


    /*@ngInject*/
    function AppGeoPositionSvc($q, $filter) {

        var service = {
            getCurrentPosition: function () {

                function promise(resolve, reject) {

                    var options = {enableHighAccuracy: true};

                    function geolocationSuccess(pos) {

                        var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                        resolve({
                            data: pos,
                            coords: pos.coords,
                            coords_v1: pos.coords.latitude + ',' + pos.coords.longitude,
                            coords_v2: pos.coords.latitude + '|' + pos.coords.longitude,
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        });
                    }

                    function geolocationError(error) {

                        var message = "Imposible obtener Geolocalización. ";

                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                message += "User denied the request for Geolocation. ";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                message += "Location information is unavailable."
                                break;
                            case error.TIMEOUT:
                                message += "The request to get user location timed out."
                                break;
                            case error.UNKNOWN_ERROR:
                                message += "An unknown error occurred."
                                break;
                        }

                        reject(message + error.message);
                    }

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options);
                    } else {
                        reject("Geolocation is not supported by this browser.");
                    }
                }

                return $q(promise);

            }
        };

        return service;
    }

    /*@ngInject*/
    function AppNomenclatorSvc($q, $filter, $http, API_INFOGUIA) {

        var service = {
            getNomenclador: function (pnomenclador, remote, id) {

                //------- NOMENCLADORES ----- 
                //  
                //  => TIPO_PUBLICACION 
                //  => ESTADO_PUBLICACION
                //  => TIPO_USUARIO
                //  => ESTADO_USUARIO
                //  => GRUPO_CATEGORIA

                var pid = id || null;
                var premote = (typeof remote == undefined || remote == null || remote == "") ? false : true;

                function NOMENCLADOR(model) {
                    this.id = model.id || null;
                    this.descripcion = model.descripcion || null;
                }

                var tipoPublicacion = [
                    new NOMENCLADOR({id: 1, descripcion: "Promociones"}),
                    new NOMENCLADOR({id: 2, descripcion: "Novedades"})
                ];

                var estadoPublicacion = [
                    new NOMENCLADOR({id: 1, descripcion: "ACTIVO"}),
                    new NOMENCLADOR({id: 2, descripcion: "INACTIVO"})
                ];

                var tipoUsuario = [
                    new NOMENCLADOR({id: 1, descripcion: "Administrador"}),
                    new NOMENCLADOR({id: 2, descripcion: "Usuario"}),
                    new NOMENCLADOR({id: 3, descripcion: "Cliente"})
                ];

                var estadoUsuario = [
                    new NOMENCLADOR({id: 1, descripcion: "Activo"}),
                    new NOMENCLADOR({id: 2, descripcion: "Inactivo"}),
                    new NOMENCLADOR({id: 3, descripcion: "Pendiente de activación"})
                ];

                var grupoCategoria = [
                    new NOMENCLADOR({id: 1, descripcion: "Informaciones"}),
                    new NOMENCLADOR({id: 2, descripcion: "Servicios"}),
                    new NOMENCLADOR({id: 3, descripcion: "Negocios"}),
                    new NOMENCLADOR({id: 4, descripcion: "Turismo"}),
                    new NOMENCLADOR({id: 5, descripcion: "Ocio"}),
                    new NOMENCLADOR({id: 6, descripcion: "Novedades"}),
                    new NOMENCLADOR({id: 7, descripcion: "Promocionales"})
                ];

                function promise(resolve, reject) {

                    var collection = [];

                    switch (pnomenclador) {
                        case 'TIPO_PUBLICACION':
                            collection = tipoPublicacion;
                            break;
                        case 'ESTADO_PUBLICACION':
                            collection = estadoPublicacion;
                            break;
                        case 'TIPO_USUARIO':
                            collection = tipoUsuario;
                            break;
                        case 'ESTADO_USUARIO':
                            collection = estadoUsuario;
                            break;
                        case 'GRUPO_CATEGORIA':
                            collection = grupoCategoria;
                            break;
                        default:
                            collection = [];
                    }

                    if (!pnomenclador) {
                        reject('Debe indicar el parámetro "pnomenclador" de la función');
                    }
                    else if (pid !== null) {
                        var result = $filter('filter')(collection, {id: pid});
                        if (result !== null && result.length > 0)
                            resolve(result[0]);
                        else
                            reject("No se encuentra " + pnomenclador + " => ID:" + pid);
                    } else {
                        resolve(collection);
                    }
                }

                function promiseRemote(resolve, reject) {

                    var url = null;

                    switch (pnomenclador) {
                        case 'TIPO_PUBLICACION':
                            if (pid == null)
                                url = API_INFOGUIA + '/tiposPublicaciones/find/all';
                            else
                                url = API_INFOGUIA + '/tiposPublicaciones/find/' + pid;
                            break;
                        case 'ESTADO_PUBLICACION':
                            if (pid == null)
                                url = API_INFOGUIA + '/estadosPublicaciones/find/all';
                            else
                                url = API_INFOGUIA + '/estadosPublicaciones/find/' + pid;
                            break;
                        default:
                            url = null;
                    }

                    if (!pnomenclador || url == null) {
                        reject('Debe indicar el parámetro "pnomenclador" de la función');
                    }
                    else {
                        $http({
                            method: 'GET',
                            url: url
                        }).then(function (response) {
                            resolve(response.data);
                        }, function (response) {
                            reject("Ha ocurrido un error cargando. " + pnomenclador + " => " + response.statusText);
                        });
                    }
                }

                return !premote ? $q(promise) : $q(promiseRemote);
            }
        };

        return service;
    }

})(jQuery);    