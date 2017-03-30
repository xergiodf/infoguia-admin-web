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

            },
            getNomenclador: function (pnomenclador, id) {

                //------- NOMENCLADORES ----- 
                //  
                //  => TIPO_PUBLICACION 
                //  => ESTADO_PUBLICACION

                var pid = id || null;

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


                function promise(resolve, reject) {

                    var collection = [];

                    switch (pnomenclador) {
                        case 'TIPO_PUBLICACION':
                            collection = tipoPublicacion;
                            break;
                        case 'ESTADO_PUBLICACION':
                            collection = estadoPublicacion;
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

                return $q(promise);
            }
        };

        return service;
    }
    
    /*@ngInject*/
    function AppNomenclatorSvc($q, $filter) {

        var service = {
            getNomenclador: function (pnomenclador, id) {

                //------- NOMENCLADORES ----- 
                //  
                //  => TIPO_PUBLICACION 
                //  => ESTADO_PUBLICACION

                var pid = id || null;

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
                    new NOMENCLADOR({id: 1, descripcion: "Administrador"})
                ];

                var estadoUsuario = [
                    new NOMENCLADOR({id: 1, descripcion: "ACTIVO"})
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

                return $q(promise);
            }
        };

        return service;
    }    

})(jQuery);    