var app = angular.module('timepickerDemoApp', ['timepicker']);

app.controller('timepickerDemoController', ['$scope',
  function($scope) {
    $scope.startTime;
    $scope.currentDate = '7/16/2014';
    $scope.defaultTime = '11:00 pm';
    $scope.toggleDate = function () {
      if ($scope.currentDate == '7/16/2014') {
        $scope.currentDate = '7/17/2014';
      } else {
        $scope.currentDate = '7/16/2014';
      }
    }
  }
]);