/**
 * Created by rishabhdev on 11/12/16.
 */

angular.module('matchpairs').controller('mainCtrl',function($scope,$timeout,$rootScope){

    var icons = [
        'fa-address-book',
        'fa-bandcamp',
        'fa-quora',
        'fa-telegram',
        'fa-facebook',
        'fa-twitter'
    ];
    $scope.points = 0;
    $scope.assignedIcons = {};
    $scope.bestScore = 0;

    $scope.assignIcons = function(){
        icons.forEach(function(icon){
            var assignedCells = 0;
            while(assignedCells <2){
                assignToRandomCell(icon);
                assignedCells++;
            }
        });

        //select any random icon and assign to two cells
       var iteration = 0
       while(iteration<2) {
           var randIndex = generateRandomInt(5);
           var assignedCells = 0;
           while(assignedCells<2) {
               assignToRandomCell(icons[randIndex]);
               assignedCells++;
           }
           iteration++;
       }
    }

    $scope.onCellClick = function(cellId){

        var iconObj = $scope.assignedIcons[cellId];
        var otherVisibleIcon = Object.keys($scope.assignedIcons).filter(function(key){
            return ($scope.assignedIcons[key] !== iconObj) && $scope.assignedIcons[key].visible
        }).map(function(key){
            return $scope.assignedIcons[key];
        })[0];


        if(otherVisibleIcon) {
            if(otherVisibleIcon.icon == iconObj.icon){
                otherVisibleIcon.disable = true;
                iconObj.disable = true;
                $scope.points +=10;
            }
            else {
                if(iconObj.count>1 || otherVisibleIcon.count>1){
                    $scope.points -= 5;
                }

            }
            $timeout(function () {
                iconObj.visible = false;
                otherVisibleIcon.visible = false;

            }, 1000);
        }

        if(checkGameComplete()){
            $scope.message = 'Congratulations you scored '+$scope.points + ' points out of 80';
            $scope.bestScore = $scope.points>$scope.bestScore? $scope.points : $scope.bestScore;
        }
    }

    function assignToRandomCell(icon){
        var cell ='';
        var assigned = false;

        if(Object.keys($scope.assignedIcons).length === 16){
            return assigned;
        }

        while(!assigned) {
            cell = generateRandomInt(3)+'' + generateRandomInt(3)+'';
            if (!$scope.assignedIcons[cell]) {
                $scope.assignedIcons[cell] = {icon:icon,visible:false,cell:cell};
                assigned = true;
            }
        }
        return assigned;

    }
    function generateRandomInt(max){
        return Math.floor(Math.random()*(max+1));
    }

    function checkGameComplete(){
        // if all cells disabled then game complete

        return Object.keys($scope.assignedIcons).filter(function(key){
            return !$scope.assignedIcons[key].disable;
        }).length == 0 ?  true :  false;
    }

    $scope.assignIcons();

    $scope.resetGame = function(){
        $scope.assignedIcons = {};
        $scope.assignIcons();
        $scope.points = 0;
        $rootScope.$emit('resetPuzzle');
        $scope.message = '';
        //$scope.$apply();
    }
});
