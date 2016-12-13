/**
 * Created by rishabhdev on 13/12/16.
 */
/**
 * Created by rishabhdev on 12/12/16.
 */

angular.module('matchpairs').directive('flier',function($timeout,$rootScope){
    return {
        restrict: 'A',
        template:'<span ng-class="{greenText:increase,redText:!increase}">{{flierText}}</span>',
        scope:{
            data:'=data'
        },
        link:function(scope,element) {

            scope.$watch('data',function(val,old){
                var temp = val - old;
                element.removeClass('flier');

                if(temp == -5){
                    scope.flierText = ''+temp;
                    scope.increase = false;
                    $timeout(function(){
                        element.addClass('flier');

                    },100);
                }
                else if(temp == 10){
                    scope.flierText = '+'+temp;
                    scope.increase = true;
                    $timeout(function(){
                        element.addClass('flier');

                    },100);
                }



            })
        }


    }
})
