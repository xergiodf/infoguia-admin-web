(function () {

    "use strict";

    angular.module('reporte.module')
            .controller('ReporteListController', ReporteListController);

    /*@ngInject*/
    function ReporteListController($scope, $state, $stateParams, ReporteSvc) {

        var vm = this;

        vm.init = Init;

        vm.fn = {
            goToView: goToView,
            goToDelete: goToDelete
        };

        vm.reporte = {};

        vm.list = [];

        vm.init();

        //Functions

        function Init() {
            
            return;
            
            ReporteSvc.query().then(function (data) {
                vm.list = data;
            }, function (err) {
                alert(err);
            });
        }


        function goToView(id) {
            alert('not implemented yet');
        }

        function goToDelete(id) {
            var msg = confirm("Está seguro que desea eliminar este reporte?");
            if (!msg || !id)
                return;
            
            return;

            ReporteSvc.delete(id).then(function (data) {
                vm.init();
            }, function (err) {
                alert(err);
            })
        }
    }

})();

