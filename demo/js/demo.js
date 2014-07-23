var app = angular.module('timepickerDemoApp', ['timepicker']);

app.controller('timepickerDemoController', ['$scope',
  function($scope) {
    $scope.startTime;
    $scope.currentDate = '7/22/2014';
    $scope.defaultTime = '10:00 pm';
  
    $scope.updateDateAttr = function(date, time) {
      if (typeof date != 'undefined' && typeof time != 'undefined') {
        $scope.properDate = new Date(date + ' ' + time);
      } else {
        $scope.properDate = false;
      }
    }

    $scope.toggleDate = function() {
      if ($scope.currentDate == '7/22/2014') {
        $scope.currentDate = '7/23/2014';
      } else {
        $scope.currentDate = '7/22/2014';
      }
    }
  }
]);
