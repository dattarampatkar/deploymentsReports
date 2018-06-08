var dashboardApp = angular.module("dashboardApp", ['ngRoute']);
dashboardApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

    when('/deploymentInfo', {
        templateUrl: 'templates/deploymentInfo.htm',
        controller: 'deploymentInfoController'
    }).

    when('/rcTagStatus', {
        templateUrl: 'templates/rcTagStatus.htm',
        controller: 'rcTagStatusController'
    }).

    when('/deploymentTarget', {
        templateUrl: 'templates/deploymentTarget.htm',
        controller: 'deploymentTargetController'
    }).

    when('/rcTagTimeLine', {
        templateUrl: 'templates/rcTagTimelineChart.htm',
        controller: 'rcTagTimelineController'
    }).

    when('/jenkinsJobsBarCharts', {
        templateUrl: 'templates/jenkinsJobsBarCharts.htm',
        controller: 'jenkinsJobsBarChartsController'
    }).

    otherwise({
        redirectTo: '/deploymentInfo'
    });
}]);

dashboardApp.directive("statusText", function () {
    return {
        template: "<label class='blink'> {{displayMessage}} </label>",

    };
});

dashboardApp.controller('deploymentInfoController', function ($scope, $http, $timeout) {

    $scope.isLoading = false;
    $scope.displayMessage = '';

    var _headers = {
        'Authorization': 'Basic YWRtaW46YWRtaW4jJVdF',
        'Access-Control-Allow-Origin': '*'
    };
    var enableAutoLoading = false;


    $scope.projects = ["Holt", "ECS"];
    $scope.sortColumn = 'timestamp';
    $scope.reverseSort = true;

    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    }
    $scope.getSortClass = function (column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }

    $scope.reload = function () {
        $scope.isLoading = true;
        $scope.displayMessage = 'Fetching new records..';
        $http({
            method: 'GET',
            url: 'http://laq9esbqa603.ngco.com:4415/v1/devops/deploymentInfo',
            headers: _headers
        }).then(function (response) {
            enableAutoLoading = true;
            $scope.listDeployments = response.data;
            $scope.isLoading = false;
            $scope.displayMessage = '';
        }, function (error) {
            $scope.displayMessage = 'Error while fetching records..';
            $scope.isLoading = false;
        })
    }

    $timeout(function () {
            if (enableAutoLoading) {
                $scope.initialCount = $scope.listDeployments.length
                $scope.reload();
                if ($scope.initialCount === $scope.listDeployments.length) {
                    $scope.showvalue = false;
                } else {
                    $scope.showvalue = true;
                }
            }
        },
        15000);
    $scope.reload();

});

dashboardApp.controller('rcTagStatusController', function ($scope, $http, $timeout) {
    var _headers = {
        'Authorization': 'Basic YWRtaW46YWRtaW4jJVdF',
        'Access-Control-Allow-Origin': '*'
    };
    $scope.sortColumn = 'project', 'interface';
    $scope.reverseSort = false;

    $scope.isLoading = false;
    $scope.displayMessage = '';

    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    }
    $scope.getSortClass = function (column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }
    $scope.reload = function () {
        $scope.isLoading = true;
        $scope.displayMessage = 'Fetching new records..';
        $http({
            method: 'GET',
            url: 'http://laq9esbqa603.ngco.com:4415/v1/devops/deploymentRCtagAllStatus',
            headers: _headers
        }).then(function (response) {
            $scope.listRCTags = response.data;
            $scope.sortColumn = 'project', 'interface';
            $scope.reverseSort = false;

            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }

            $scope.getSortClass = function (column) {
                if ($scope.sortColumn == column) {
                    return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                }
                return '';
            }
            $scope.isLoading = false;
            $scope.displayMessage = '';

        }, function (error) {
            $scope.displayMessage = 'Error while fetching records..';
            $scope.isLoading = false;
        });

        $timeout(function () {
            $scope.reload();
        }, 15000)
    };

    $scope.reload();

});


dashboardApp.controller('deploymentTargetController', function ($scope, $http) {
    var _headers = {
        'Authorization': 'Basic YWRtaW46YWRtaW4jJVdF',
        'Access-Control-Allow-Origin': '*'
    };
    $scope.sortColumn = 'project', 'interface';
    $scope.reverseSort = false;

    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    }
    $scope.getSortClass = function (column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }
    $scope.reload = function () {
        $scope.isLoading = true;
        $scope.displayMessage = 'Fetching new records..';
        $http({
            method: 'GET',
            url: 'http://laq9esbqa603.ngco.com:4415/v1/devops/deploymentTarget/Holt/WMSToSAP_InventoryReconciliationFlows',
            headers: _headers
        }).then(function (response) {
            $scope.listDeploymentTargets = response.data;
            $scope.sortColumn = 'project', 'interface';
            $scope.reverseSort = false;

            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }

            $scope.getSortClass = function (column) {
                if ($scope.sortColumn == column) {
                    return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                }
                return '';
            }
            $scope.isLoading = false;
            $scope.displayMessage = '';

        }, function (error) {
            $scope.displayMessage = 'Error while fetching records..';
            $scope.isLoading = false;
        });
    };

    $scope.reload();

});


dashboardApp.controller('rcTagTimelineController', function ($scope, $http) {
    var dev = {
        x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00', '2013-12-10 22:23:00', '2013-12-22 22:23:00'],
        y: ['rc001', 'rc002', 'rc003', 'rc004', 'rc005', 'rc006'],
        type: 'scatter',
        line: {
            shape: 'spline'
        },
        name: 'DEV Deployment'
    };
    var sit =  {
        x: ['2013-10-05 22:23:00', '2013-11-05 22:23:00', '2013-12-06 22:23:00', '2013-12-11 22:23:00', '2013-12-24 22:23:00'],
        y: ['rc001', 'rc002', 'rc003', 'rc004', 'rc005', 'rc006'],
        type: 'scatter',
        line: {
            shape: 'spline'
        },
        name: 'SIT Deployment'
    };

    var pt =  {
        x: ['2013-10-14 22:23:00', '2013-11-14 22:23:00', '2013-12-14 22:23:00', '2013-12-20 22:23:00', '2013-12-27 22:23:00'],
        y: ['rc001', 'rc002', 'rc003', 'rc004', 'rc005', 'rc006'],
        type: 'scatter',
        line: {
            shape: 'spline'
        },
        name: 'PT Deployment'
    };

    var data = [
        dev, sit, pt
    ];

    Plotly.newPlot('rctimelinechart', data);

});

dashboardApp.controller('jenkinsJobsBarChartsController', function ($scope, $http) {

    var _headers = {
        'Authorization': 'Basic YWRtaW46YWRtaW4jJVdF',
        'Access-Control-Allow-Origin': '*'
    };

    var failed = {
        x: ['Build', 'Deploy', 'Migrate'],
        y: [0, 0, 0],
        name: 'Failure',
        type: 'bar',
        marker: {
            color: '#19d3f3'
        }
    };
    var passed = {
        x: ['Build', 'Deploy', 'Migrate'],
        y: [0, 0, 0],
        name: 'Successful',
        type: 'bar',
        marker: {
            color: '#ab63fa'
        }
    };

	function plotChart(data) {
        Plotly.newPlot('jobstatuschart', data);
    }

    function addValue(objc, job_type) {
        if (job_type == 'Build') {
            objc.y[0] = objc.y[0] + 1;
        } else if (job_type == 'Deploy') {
            objc.y[1] = objc.y[1] + 1;
        } else if (job_type == 'Migrate') {
            objc.y[2] = objc.y[2] + 1;
        }
    }
	
	function resetVars() {    
            failed.y[0] =failed.y[1]=failed.y[2]=0;
            passed.y[0] =passed.y[1]=passed.y[2]=0;
          
    }
	
	$scope.loadProjects = function() {
		$http({
            method: 'GET',
            url: 'http://laq9esbqa603.ngco.com:4415/v1/devops/projects',
            headers: _headers
        }).then(function (response) {
            enableAutoLoading = true;
			var array = response.data;
            for (var i = 0; i < array.length; i++) {
                $scope.projects=response.data;
            }
			
			plotChart([passed,failed]);

        }, function (error) {})
	}
	
	$scope.loadProjects();
	
	$scope.loadInterfaces = function() {
		$http({
            method: 'GET',
            url: 'http://laq9esbqa603.ngco.com:4415/v1/devops/project/'+$scope.selectedProject+'/interfaces',
            headers: _headers
        }).then(function (response) {
            enableAutoLoading = true;
			var array = response.data;
            for (var i = 0; i < array.length; i++) {
				  var array = response.data;
  var interface_array=[];
for (var i=0; i< array.length;i++){
    interface_array[interface_array.length]= array[i].interface;
    
}
console.log(interface_array);
                $scope.interfaces=interface_array;
            }
			
			plotChart([passed,failed]);

        }, function (error) {})
	}
		
	function getURL(){
		var url = 'http://laq9esbqa603.ngco.com:4415/v1/devops/deploymentInfo';
		if($scope.selectedProject !==undefined){
			url = url + "?project=" +$scope.selectedProject;
			if($scope.selectedInterface !==undefined){
				url = url + "&interface="+$scope.selectedInterface;
			}	
		}
		return url;
	}

    $scope.loadData = function () {
		console.log("Loading data for project"+$scope.selectedProject +" and interface "+$scope.selectedInterface);
        $scope.displayMessage = 'Fetching new records..';
		resetVars();
        $http({
            method: 'GET',
            url: getURL(),
            headers: _headers
        }).then(function (response) {
            enableAutoLoading = true;
			var array = response.data;
            for (var i = 0; i < array.length; i++) {

                var job_type = array[i]['job_type'];
                var job_status = array[i]['status'];

                if (job_status == 'Passed') {
                    addValue(passed, job_type);
                } else if (job_status == 'Failed') {
                    addValue(failed, job_type);
                }

            }
			
			plotChart([passed,failed]);

        }, function (error) {
			
		})
    };

   // $scope.loadData();



});