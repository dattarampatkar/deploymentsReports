/// <reference path="angular.js" />

var myApp = angular.module("myModule", []);

myApp.controller("myController", function($scope, $http, $timeout){
    // var username = 'dattaram.m.patkar@accenture.com';
    // var password = 'IIBDeployment1234$';
    // var authdata = $base64.encode('dattaram.m.patkar@accenture.com' + ':' + 'IIBDeployment1234$');
    // $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
    // $http.defaults.headers.common.Authorization = 'Basic ' + 'ZGF0dGFyYW0ubS5wYXRrYXJAYWNjZW50dXJlLmNvbTpJSUJEZXBsb3ltZW50MTIzNCQ=';
    // let headers = new Headers();
    // headers.append("Authorization", "Basic ZGF0dGFyYW0ubS5wYXRrYXJAYWNjZW50dXJlLmNvbTpJSUJEZXBsb3ltZW50MTIzNCQ="
    //             , 'Access-Control-Allow-Origin':'*');
    var _headers = {'Authorization':'Basic YWRtaW46YWRtaW4jJVdF',
        'Access-Control-Allow-Origin': '*'};
    //var headersRequest = {'Authorization':'Basic ZGF0dGFyYW0ubS5wYXRrYXJAYWNjZW50dXJlLmNvbTpJSUJEZXBsb3ltZW50MTIzNCQ='};

    $scope.reload = function () {
        $http({
            method: 'GET', 
            url:'http://localhost:7800/v1/devops/deploymentRCtagAllStatus'
            , headers:_headers 
        }).then(function(response){
                $scope.listRCTags = response.data;
                $scope.sortColumn = 'project','interface';
                $scope.reverseSort = false;

                $scope.sortData = function(column){
                    $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                    $scope.sortColumn = column;
                }

                $scope.getSortClass = function(column){
                    if ($scope.sortColumn == column){
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                }

        }, function(error){

        });

        $timeout(function(){
            $scope.reload();
          }, 15000)
    };
    
    $scope.reload();
});