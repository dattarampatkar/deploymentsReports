/// <reference path="angular.js" />

var deploymentApp = angular.module("deploymentApp", []);

deploymentApp.controller("deployController", function($scope, $http, $timeout){
    $scope.showvalue = false;
    $scope.displaymessage = 'New deployment record added';

    // var username = 'dattaram.m.patkar@accenture.com';
    // var password = 'IIBDeployment1234$';
    // var authdata = Base64.encode('dattaram.m.patkar@accenture.com' + ':' + 'IIBDeployment1234$');
    // var headers = {"Authorization": "Basic " + authdata};
    //$http.defaults.headers.common.Authorization = 'Basic ZGF0dGFyYW0ubS5wYXRrYXJAYWNjZW50dXJlLmNvbTpJSUJEZXBsb3ltZW50MTIzNCQ=';
    var _headers = {'Authorization':'Basic YWRtaW46YWRtaW4jJVdF',
                        'Access-Control-Allow-Origin': '*'};
    // $http.defaults.headers.common['Authorization'] = 'Basic ZGF0dGFyYW0ubS5wYXRrYXJAYWNjZW50dXJlLmNvbTpJSUJEZXBsb3ltZW50MTIzNCQ=';
    // $http.defaults.headers.common.
    //    var headersRequest = {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //      'Authorization' :'Basic ' + 'ZGF0dGFyYW0ubS5wYXRrYXJAYWNjZW50dXJlLmNvbTpJSUJEZXBsb3ltZW50MTIzNCQ='
    //     };

    var responseMsg = false;

    $scope.reload = function () {
        $http({
            method: 'GET', 
            url:'http://localhost:7800/v1/devops/deploymentInfo'
        ,   headers:_headers
        }).then(function(response){
                responseMsg = true;
                $scope.listDeployments = response.data;
                $scope.sortColumn = 'timestamp';
                $scope.reverseSort = true;

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
            $scope.showvalue = true;
            $scope.displaymessage = 'Error in fetching records';
        });

        $timeout(function(){
            if(responseMsg){
                $scope.initialCount = $scope.listDeployments.length            
                $scope.reload();
                if($scope.initialCount === $scope.listDeployments.length){
                    $scope.showvalue = false; 
                }else{
                    $scope.showvalue = true;
                }
            }            
          },
          15000)
    };
    
    $scope.reload();
});