(function() {

    "use strict";

    angular.module('app.auth')
            .controller('LogoutController', LogoutController);

    /*@ngInject*/
    function LogoutController($state, $timeout) {
        var vm = this;

        vm.init = Init;

        Init();

        function Init() {
            $timeout(function() {
                $state.go('auth.login');
            }, 2000);
        }
    }

})();




