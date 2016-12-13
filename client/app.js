/**
 * Created by rishabhdev on 11/12/16.
 */

var app = angular.module('matchpairs',['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "controllers/main/main.html"
        })
        .when("/main", {
            templateUrl : "controllers/main/main.html"
        })

});
