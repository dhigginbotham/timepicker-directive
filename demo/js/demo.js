var app = angular.module('timepickerDemoApp', ['timepicker']);

app.controller('timepickerDemoController', ['$scope',
  function($scope) {

    var TODAY = new Date();
    var TOMORROW = true;

    $scope.selectedTime = TODAY.toLocaleTimeString();
    $scope.defaultTime = '10:00 pm';
    $scope.currentDate = TODAY.toLocaleDateString();

    $scope.updateDateAttr = function(date, time) {
      if (typeof date != 'undefined' && typeof time != 'undefined') {
        $scope.properDate = new Date(date + ' ' + time);
      } else {
        $scope.properDate = false;
      }
    }

    $scope.toggleDate = function() {
      TOMORROW = !TOMORROW;
      if (TOMORROW) {
        TODAY.setDate(TODAY.getDate()-1);
      } else {
        TODAY.setDate(TODAY.getDate()+1);
      }
      $scope.currentDate = TODAY.toLocaleDateString();
    }

  }
]);
