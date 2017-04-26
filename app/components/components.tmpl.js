(function () {

    "use strict";

    angular.module('app')
            .run(AppComponentTemplateCache);

    /*@ngInject*/
    function AppComponentTemplateCache($templateCache) {

        $templateCache.put('app/components/cmp.singleimagepicker.html',
                "<div class=\"so-single-image-picker\"><div class=\"sip-img-box thumbnail\"><div class=\"sip-thumb\"><div class=\"sip-centered\"><img style=\"display:block !important\" class=\"img-responsive\" ngf-src=\"file\" ngf-default-src=\"'{{ source }}'\"></div></div></div><div class=\"sip-upload\" ng-if=\"showFileInput\"><button type=\"button\" class=\"btn yellow btn-select-images\" title=\"Buscar\" ng-model=\"file\" ngf-pattern=\"'.jpg,.png'\" accept=\"image/*\" ngf-max-size=\"2MB\" ngf-multiple=\"false\" ng-model-options=\"{updateOn: 'change', allowInvalid: false, debounce: 0}\" ngf-change=\"vm.fn.changeFilesSelect($file)\" ngf-select><i class=\"fa fa-navicon\"></i> <span class=\"text\">Examinar</span></button> <button class=\"btn green btn-reset-file\" data-ng-click=\"vm.fn.resetFile($event)\"><i class=\"fa fa-undo\"></i></button><p class=\"text-info info-extensiones\"><span class=\"sip-ext-allowed\">.JPG, .PNG</span> <span class=\"sip-size-allowed\"><strong>2MB</strong></span></p></div></div>"
                );
    }

})();