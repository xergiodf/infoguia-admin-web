(function($) {

    "use strict";
    angular.module('app')
            .filter('coordFilter', coordFilter)
            .filter('coordbracketFilter', coordbracketFilter);
    
    /*@ngInject*/
    function coordFilter() {
        return function(text, split) {
            
            var splitter = split || '|';
           
            if (text !== null) {
                var splitterText = text.split(splitter);
                var joinSplitter = splitterText.join(',');
                return joinSplitter;
            }else{
                return text;
            }
        }
    }
    
    /*@ngInject*/
    function coordbracketFilter() {
        return function(text, split) {
            
            var splitter = split || '|';
           
            if (text !== null) {
                var splitterText = text.split(splitter);    
                return splitterText;
            }else{
                return text;
            }
        }
    }    

})(jQuery);    