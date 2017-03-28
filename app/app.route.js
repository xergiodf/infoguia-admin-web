(function () {

    "use strict";

    angular.module('app')
            .config(ConfigRoute)
            .constant('APP_ROOT', {
                base: 'app/',
                views: 'app/views/',
                layouts: 'app/views/layouts/'
            })
            .constant('CLIENT_ROOT', {
                base: 'app/module/cliente/',
                views: 'app/module/cliente/views/',
                layouts: 'app/module/cliente/views/layouts/'
            })
            .constant('SUCURSAL_ROOT', {
                base: 'app/module/sucursal/',
                views: 'app/module/sucursal/views/',
                layouts: 'app/module/sucursal/views/layouts/'
            })
            .constant('PUBLICACION_ROOT', {
                base: 'app/module/publicacion/',
                views: 'app/module/publicacion/views/',
                layouts: 'app/module/publicacion/views/layouts/'
            })
            .constant('AUTH_ROOT', {
                base: 'app/module/auth/',
                views: 'app/module/auth/views/',
                layouts: 'app/module/auth/views/layouts/'
            });

    /*@ngInject*/
    function ConfigRoute($urlRouterProvider, $stateProvider, APP_ROOT, CLIENT_ROOT, AUTH_ROOT, SUCURSAL_ROOT, PUBLICACION_ROOT) {

        $urlRouterProvider
                .when("/", "/auth/login")
                .when("", "/auth/login")
                .otherwise("/404");

        $stateProvider
                .state('site', {
                    abstract: true,
                    data: {},
                    views: {
                        '': {
                            templateUrl: APP_ROOT.layouts + '_main.html'
                        }
                    }
                })
                .state('init', {
                    abstract: true,
                    data: {},
                    views: {
                        '': {
                            templateUrl: APP_ROOT.layouts + '_init.html'
                        }
                    },
                    resolve: {
                    }
                })
                .state('site.layout', {
                    abstract: true,
                    data: {},
                    views: {
                        'header@site': {
                            templateUrl: APP_ROOT.views + 'components/cmp.header.html',
                        },
                        'leftpanel@site': {
                            templateUrl: APP_ROOT.views + 'components/cmp.leftpanel.html',
                            //controller: 'LeftPanelController as lpanel'
                        },
                        'footer@site': {
                            templateUrl: APP_ROOT.views + 'components/cmp.footer.html',
                            //controller: 'LeftPanelController as lpanel'
                        },
                        'controlsidebar@site': {
                            templateUrl: APP_ROOT.views + 'components/cmp.controlsidebar.html',
                            //controller: 'LeftPanelController as lpanel'
                        },
                        'pagecontentheader@site': {
                            templateUrl: APP_ROOT.views + 'components/cmp.pagecontentheader.html',
                            //controller: 'LeftPanelController as lpanel'
                        }
                    }
                })
                .state('init.layout', {
                    abstract: true,
                    data: {},
                    views: {}
                })
                .state('404', {
                    url: "/404",
                    parent: 'init.layout',
                    data: {pageTitle: "404"},
                    views: {
                        'content@init': {
                            templateUrl: APP_ROOT.views + 'partials/error/404.html'
                        }
                    }
                })
                .state('home', {
                    url: "/home",
                    parent: 'site.layout',
                    data: {
                        pageTitle: "Dashboard",
                        pageHeader: "Dashboard",
                        pageDescription: "Panel de Administración"},
                    views: {
                        'content@site': {
                            templateUrl: APP_ROOT.views + 'home.html',
                            controller: 'HomeController as vm'
                        }
                    }
                })
                //
                //AUTH MODULE
                //
                .state('auth', {
                    url: "/auth",
                    parent: 'init.layout',
                    abstract: true,
                    views: {
                        'content@init': {
                            templateUrl: AUTH_ROOT.layouts + 'main.html',
                            controller: 'AuthController'
                        }
                    }
                })
                .state('auth.login', {
                    url: "/login",
                    parent: 'auth',
                    data: {pageTitle: "Autenticar"},
                    views: {
                        '': {
                            templateUrl: AUTH_ROOT.views + 'login.html',
                            controller: 'LoginController as vm'
                        }
                    }
                })
                .state('auth.logout', {
                    url: "/logout",
                    parent: 'auth',
                    data: {pageTitle: "Cerrando..."},
                    views: {
                        '': {
                            templateUrl: AUTH_ROOT.views + 'logout.html',
                            controller: 'LogoutController as vm'
                        }
                    }
                })
                //
                //CLIENTE ROUTER
                //                
                .state('cliente', {
                    abstract: true,
                    parent: 'site.layout',
                    url: "/cliente",
                    data: {pageTitle: "Listado de Clientes"},
                    views: {
                        'content@site': {
                            templateUrl: CLIENT_ROOT.layouts + "main.html"
                        }
                    }
                })
                .state('cliente.list', {
                    parent: 'cliente',
                    url: "/list",
                    data: {
                        pageTitle: "Clientes",
                        pageHeader: "Clientes",
                        pageDescription: "Búsqueda personalizada"
                    },
                    views: {
                        '': {
                            templateUrl: CLIENT_ROOT.views + "list.html",
                            controller: "ClienteListController as vm"
                        }
                    }
                })
                .state('cliente.create', {
                    parent: 'cliente',
                    url: "/create",
                    data: {
                        pageTitle: "Nuevo Cliente",
                        pageHeader: "Nuevo Cliente",
                        pageDescription: "Formulario de creación de nuevo cliente"
                    },
                    views: {
                        '': {
                            templateUrl: CLIENT_ROOT.views + "create.html",
                            controller: "ClienteCreateController as vm"
                        }
                    }
                })
                .state('cliente.edit', {
                    parent: 'cliente',
                    url: "/edit/{id}",
                    data: {
                        pageTitle: "Editar Cliente",
                        pageHeader: "Editar Cliente",
                        pageDescription: "Formulario de edición de cliente"
                    },
                    views: {
                        '': {
                            templateUrl: CLIENT_ROOT.views + "edit.html",
                            controller: "ClienteEditController as vm"
                        }
                    }
                })
                .state('cliente.view', {
                    parent: 'cliente',
                    url: "/view/{id}",
                    data: {
                        pageTitle: "Detalle Cliente",
                        pageHeader: "Detalle Cliente",
                        pageDescription: "Detalle de cliente"
                    },
                    views: {
                        '': {
                            templateUrl: CLIENT_ROOT.views + "view.html",
                            controller: "ClienteViewController as vm"
                        }
                    }
                })
                //
                //SUCURSAL ROUTER
                //                
                .state('sucursal', {
                    abstract: true,
                    parent: 'site.layout',
                    url: "/sucursal",
                    data: {pageTitle: "Sucursales"},
                    views: {
                        'content@site': {
                            templateUrl: SUCURSAL_ROOT.layouts + "main.html"
                        }
                    }
                })
                .state('sucursal.init', {
                    parent: 'sucursal',
                    url: "/init",
                    data: {
                        pageTitle: "Sucursal/Cliente",
                        pageHeader: "Nueva Sucursal de Cliente",
                        pageDescription: "Formulario de selección de Cliente para nueva Sucursal."
                    },
                    views: {
                        '': {
                            templateUrl: SUCURSAL_ROOT.views + "init.html",
                            controller: "SucursalInitCreateController as vm"
                        }
                    }
                })                
                .state('sucursal.create', {
                    parent: 'sucursal',
                    url: "/create/{id}",
                    data: {
                        pageTitle: "Nueva Sucursal",
                        pageHeader: "Nuevo Sucursal de Cliente",
                        pageDescription: "Formulario de creación de nueva Sucursal de Cliente."
                    },
                    views: {
                        '': {
                            templateUrl: SUCURSAL_ROOT.views + "create.html",
                            controller: "SucursalClienteCreateController as vm"
                        }
                    }
                })
                .state('sucursal.edit', {
                    parent: 'sucursal',
                    url: "/edit/{id}",
                    data: {
                        pageTitle: "Editar Sucursal",
                        pageHeader: "Editar Sucursal",
                        pageDescription: "Formulario de edición de Sucursal"
                    },
                    views: {
                        '': {
                            templateUrl: SUCURSAL_ROOT.views + "edit.html",
                            controller: "SucursalEditController as vm"
                        }
                    }
                })
                .state('sucursal.view', {
                    parent: 'sucursal',
                    url: "/view/{id}",
                    data: {
                        pageTitle: "Detalle Sucursal",
                        pageHeader: "Detalle Sucursal",
                        pageDescription: "Detalle de Sucursal"
                    },
                    views: {
                        '': {
                            templateUrl: SUCURSAL_ROOT.views + "view.html",
                            controller: "SucursalViewController as vm"
                        }
                    }
                })
                //
                //PUBLICACION ROUTER
                //                
                .state('publicacion', {
                    abstract: true,
                    parent: 'site.layout',
                    url: "/publicacion",
                    data: {pageTitle: "Listado de Publicaciones"},
                    views: {
                        'content@site': {
                            templateUrl: PUBLICACION_ROOT.layouts + "main.html"
                        }
                    }
                })
                .state('publicacion.list', {
                    parent: 'publicacion',
                    url: "/list",
                    data: {
                        pageTitle: "Publicaciones",
                        pageHeader: "Publicaciones",
                        pageDescription: "Búsqueda personalizada"
                    },
                    views: {
                        '': {
                            templateUrl: PUBLICACION_ROOT.views + "list.html",
                            controller: "PublicacionListController as vm"
                        }
                    }
                })
                .state('publicacion.create', {
                    parent: 'publicacion',
                    url: "/create/{id}",
                    data: {
                        pageTitle: "Nueva Publicación",
                        pageHeader: "Nueva Publicación de Cliente",
                        pageDescription: "Formulario de creación de nueva Publicación de Cliente."
                    },
                    views: {
                        '': {
                            templateUrl: PUBLICACION_ROOT.views + "create.html",
                            controller: "PublicacionCreateController as vm"
                        }
                    }
                })
                .state('publicacion.edit', {
                    parent: 'publicacion',
                    url: "/edit/{id}",
                    data: {
                        pageTitle: "Editar Publiación",
                        pageHeader: "Editar Publiación",
                        pageDescription: "Formulario de edición de Publicación"
                    },
                    views: {
                        '': {
                            templateUrl: PUBLICACION_ROOT.views + "edit.html",
                            controller: "PublicacionEditController as vm"
                        }
                    }
                })
                .state('publicacion.view', {
                    parent: 'publicacion',
                    url: "/view/{id}",
                    data: {
                        pageTitle: "Detalle Publicación",
                        pageHeader: "Detalle Publicación",
                        pageDescription: "Detalle de Publicación"
                    },
                    views: {
                        '': {
                            templateUrl: PUBLICACION_ROOT.views + "view.html",
                            controller: "PublicacionViewController as vm"
                        }
                    }
                });
    }

})();