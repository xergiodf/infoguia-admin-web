(function($) {

    "use strict";
    angular.module('app')
            .directive('a', A)
            .directive('mcuiFormInput', McuiFormInput)
            .directive('mcuiBox', McuiBox)
            .directive('mcuiBoxFooterSlot', McuiBoxFooterSlot)
            .directive('mcuiBoxToolSlot', McuiBoxToolSlot)
            .directive('mcuiBtnSearch', McuiBtnSearch)
            .directive('mcuiShowHiddenPassword', McuiShowHiddenPassword);
    
    /*@ngInject*/
    function A() {
        return {
            restrict: 'E',
            scope: {linkDisabled: '=', linkBlocked: '='},
            link: function(scope, element, attrs) {

                if (scope.linkDisabled === true) {
                    $(element).addClass('link-disabled');
                }

                if (scope.linkBlocked === true) {
                    $(element).addClass('link-blocked');
                }

                if (attrs.ngClick || attrs.href === '' || attrs.href === '#' || /^#tab/.test(attrs.href)) {
                    element.on('click', function(e) {
                        e.preventDefault();
                    });
                }
            }
        };
    }
    
    /*@ngInject*/
    function McuiFormInput(){
        
        var directive = {
            restrict:"EA",
            replace: true,
            require: 'ngModel',
            template: function(){
                var template = '';
                template += '<div class="form-group">';
                template += '<label>{{ label }}</label>';
                template += '<input type="text" class="form-control" ng-model="ngModel" />';
                template += '</div>';
                
                return template;
            },
            link: function(scope, element, attrs){
               
               if(angular.isDefined(attrs.input)){
                    var properties = scope.$eval(attrs.input); 
                    for (var prop in properties)
                        element.find('.form-control').prop(prop, properties[prop]);
               }                               
            },
            scope:{
                ngModel:"=",
                label:"@",
                input:"@"
            }
        };
        
        return directive;        
    }
    
    /*@ngInject*/
    function McuiBox(){
        
        var directive = {
            restrict:"EA",
            replace: true,
            transclude:{boxFooterSlot:'?mcuiBoxFooterSlot', boxToolSlot:'?mcuiBoxToolSlot'},
            template: function(){
                var template = ''+
                '<div class="box" ng-class="boxClass">'+
                '    <div class="box-header with-border"><h3 class="box-title">{{ boxTitle }}</h3>'+
                '       <div class="box-tools" ng-transclude="boxToolSlot"></div>'+
                '    </div>'+
                '    <div class="box-body" ng-class="boxBodyClass"><ng-transclude></ng-transclude></div>'+
                '    <div class="box-footer" ng-transclude="boxFooterSlot"></div>'+
                '</div>';                
                return template;
            },
            link: function(scope, element, attrs){
                scope.boxClass = attrs.boxClass || "box-primary";
            },
            scope:{
                boxTitle:"@",
                boxClass:"@",
                boxBodyClass:"@"
            }
        };
        
        return directive;        
    } 
    
    /*@ngInject*/
    function McuiBoxFooterSlot(){        
        var directive = {
            restrict:"EA"
        };        
        return directive;        
    } 
    
    /*@ngInject*/
    function McuiBoxToolSlot(){        
        var directive = {
            restrict:"EA",
            replace:true
        };        
        return directive;        
    }     
    
    /*@ngInject*/
    function McuiBtnSearch(){        
        var directive = {
            restrict:"EA",
            replace:true,
            template: function(){
                return '<button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>'
            }
        };        
        return directive;        
    }    
    
    /*@ngInject*/
    function McuiShowHiddenPassword(){
        var directive = {
            restrict:"A",
            link: function(scope, element, attrs){
                
                var inputReference = attrs.inputReference || null;
                
                element.on('mouseenter', function(){
                    console.log('in');
                });
                
                element.on('mouseleave', function(){
                    console.log('out');
                })                
            }
        };
        
        return directive;
    }

})(jQuery);    