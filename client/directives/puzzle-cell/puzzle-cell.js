/**
 * Created by rishabhdev on 12/12/16.
 */

angular.module('matchpairs').directive('puzzleCell',function($timeout,$rootScope){
    return {
        restrict: 'E',
        templateUrl:'directives/puzzle-cell/puzzle-cell.html',
        scope:{
            icons:'=',
            cellId:'=cellId',
            onCellClick:'&clickAction'
        },
        link:function(scope,element) {


            var flipper = element[0].querySelector('.flipper');
            var iconObj;

            function init(){
                scope.iconObj = scope.icons[scope.cellId];
                iconObj = scope.iconObj;
                iconObj.count = 0;
                scope.iconClass = iconObj.icon;
                angular.element(flipper).removeClass('flipperRotate');

                scope.flipperClickHandler = function(){
                    if(!iconObj.visible && !iconObj.disable){
                        iconObj.visible = true;
                        angular.element(flipper).addClass('flipperRotate');
                        iconObj.count++;
                        scope.onCellClick();
                    }
                }
            }


            init();

            scope.$watch('iconObj',function(newData,old){
                if(newData.visible === false) {
                    angular.element(flipper).removeClass('flipperRotate');
                }
            },true);

            scope.$watch('icons',function(){
                init();
            });


        }


    }
})
