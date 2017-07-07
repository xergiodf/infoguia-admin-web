(function ($) {

    "use strict";
    angular.module('app')
            .directive('a', A)
            .directive('mcuiFormInput', McuiFormInput)
            .directive('mcuiBox', McuiBox)
            .directive('mcuiBoxFooterSlot', McuiBoxFooterSlot)
            .directive('mcuiBoxToolSlot', McuiBoxToolSlot)
            .directive('mcuiBtnSearch', McuiBtnSearch)
            .directive('mcuiShowHiddenPassword', McuiShowHiddenPassword)
            .directive('soSingleImagePicker', SoSingleImagePicker);

    /*@ngInject*/
    function A() {
        return {
            restrict: 'E',
            scope: {linkDisabled: '=', linkBlocked: '='},
            link: function (scope, element, attrs) {

                if (scope.linkDisabled === true) {
                    $(element).addClass('link-disabled');
                }

                if (scope.linkBlocked === true) {
                    $(element).addClass('link-blocked');
                }

                if (attrs.ngClick || attrs.href === '' || attrs.href === '#' || /^#tab/.test(attrs.href)) {
                    element.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
    }

    /*@ngInject*/
    function McuiFormInput() {

        var templateFn = function (element, attrs) {

            var template = '';
            template += '<div class="form-group" ng-class="{errorClassName: form.fieldModelName.$invalid}">';
            template += '<label>{{ label }}</label>';
            template += '<input type="inputType" name="fieldModelName" ng-model="ngModel" class="form-control" ng-required="required" placeholder="{{ placeholder }}" />';
            template += '<span ng-show="form.fieldModelName.$error.required && showErrorMessage == true" class="help-block">Campo obligatorio</span>';
            template += '</div>';

            var errorClassName = "'has-error'";
            var labelName = attrs.label || '';
            var inputType = attrs.type || 'text';
            var fieldModelName = getFieldModelName(attrs);

            var templateReplaced = template
                    .replace("errorClassName", errorClassName)
                    .replace("labelName", labelName)
                    .replace("inputType", inputType)
                    .replace(/fieldModelName/g, fieldModelName);

            return templateReplaced;
        };

        function getFieldModelName(attrs) {
            var objectAndField = attrs.ngModel;
            var names = objectAndField.split('.');

            var fieldModelName = 'input_';
            if (names.length == 0)
                fieldModelName = objectAndField;
            else
                fieldModelName = names[names.length - 1];

            return fieldModelName;
        }

        var directive = {
            restrict: "EA",
            replace: false,
            require: ['^form', 'ngModel'],
            template: templateFn,
            link: function (scope, element, attrs, ctrls) {

                var properties = (typeof attrs.input != 'undefined') ? scope.$eval(attrs.input) : {};
                scope.form = ctrls[0];
                var ngModel = ctrls[1];

                scope.required = (typeof attrs['required'] != 'undefined' || typeof properties['required'] != 'undefined' || typeof properties['ng-required'] != 'undefined') ? true : false;
                scope.placeholder = (typeof attrs['placeholder'] != 'undefined') ? attrs.placeholder : typeof properties['placeholder'] != 'undefined' ? properties['placeholder'] : '';
                scope.showErrorMessage = (typeof attrs['showErrorMessage'] != 'undefined' || typeof properties['showErrorMessage'] != 'undefined') ? true : false;

                var fieldModelName = getFieldModelName(attrs);
                scope.$watch(fieldModelName, function () {
                    ngModel.$setViewValue(scope[fieldModelName]);
                });

            },
            scope: {
                ngModel: "=",
                label: "@",
                input: "@"
            }
        };

        return directive;
    }

    /*@ngInject*/
    function McuiBox() {

        var directive = {
            restrict: "EA",
            replace: true,
            transclude: {boxFooterSlot: '?mcuiBoxFooterSlot', boxToolSlot: '?mcuiBoxToolSlot'},
            template: function () {
                var template = '' +
                        '<div class="box" ng-class="boxClass">' +
                        '    <div class="box-header with-border"><h3 class="box-title">{{ boxTitle }}</h3>' +
                        '       <div class="box-tools" ng-transclude="boxToolSlot"></div>' +
                        '    </div>' +
                        '    <div class="box-body" ng-class="boxBodyClass"><ng-transclude></ng-transclude></div>' +
                        '    <div class="box-footer" ng-if="!footerSlot" ng-transclude="boxFooterSlot"></div>' +
                        '</div>';
                return template;
            },
            link: function (scope, element, attrs) {
                scope.boxClass = attrs.boxClass || "box-primary";
            },
            scope: {
                boxTitle: "@",
                boxClass: "@",
                boxBodyClass: "@",
                footerSlot: "@"
            }
        };

        return directive;
    }

    /*@ngInject*/
    function McuiBoxFooterSlot() {
        var directive = {
            restrict: "EA"
        };
        return directive;
    }

    /*@ngInject*/
    function McuiBoxToolSlot() {
        var directive = {
            restrict: "EA",
            replace: true
        };
        return directive;
    }

    /*@ngInject*/
    function McuiBtnSearch() {
        var directive = {
            restrict: "EA",
            replace: true,
            template: function () {
                return '<button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>'
            }
        };
        return directive;
    }

    /*@ngInject*/
    function McuiShowHiddenPassword() {
        var directive = {
            restrict: "A",
            link: function (scope, element, attrs) {

                var inputReference = attrs.inputReference || null;

                element.on('mouseenter', function () {
                    console.log('in');
                });

                element.on('mouseleave', function () {
                    console.log('out');
                })
            }
        };

        return directive;
    }

    /*@ngInject*/
    function SoSingleImagePicker($timeout) {

        /*@ngInject*/
        function SingleImagePickerController($scope) {
            var vm = this;
            vm.fn = {
                changeFilesSelect: changeFilesSelect,
                resetFile: resetFile
            };
            vm.init = Init;

            Init();

            function Init() {
            }

            function changeFilesSelect($file) {
                if (angular.isUndefined($file) || !$file)
                    return;

                $scope.file = $file;
            }

            function resetFile($e) {
                $e.preventDefault();
                $e.stopPropagation();
                $scope.$broadcast('sip:reset', {source: $scope.source});
            }
        }

        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                scope.showFileInput = (attrs.fileInput) ? scope.$eval(attrs.fileInput) : true;

                scope.$on('sip:reset', function (event, message) {

                    if (!scope.file)
                        return;

                    scope.file = null;
                    $timeout(function () {
                        element.find('img')
                                .prop('src', scope.source);
                    }, 100);
                });

                attrs.$observe('source', function () {
                    if (attrs.source) {
                        $timeout(function () {
                            scope.source = attrs.source;
                            element.find('img')
                                    .prop('src', scope.source);
                        }, 100);
                    }
                });
            },
            templateUrl: function () {
                return 'app/components/cmp.singleimagepicker.html';
            },
            controller: SingleImagePickerController,
            controllerAs: 'vm',
            scope: {
                file: "=",
                source: "@"
            }
        }
    }

})(jQuery);    