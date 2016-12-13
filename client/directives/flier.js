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
            console.log(element);
            console.log(scope.data);
            scope.$watch('data',function(val,old){
                console.log(val);

                var temp = val - old;
                if(temp<0){
                    scope.flierText = ''+temp;
                    scope.increase = false;
                }
                else if(temp > 0){
                    scope.flierText = '+'+temp;
                    scope.increase = true;


                }
                element.removeClass('flier');

                $timeout(function(){
                    element.addClass('flier');

                },100)

            })
        }


    }
})
