(function(root) {
  var app = app || angular.module('timepicker', []);

  app.directive('timepicker', [
      function() {

        var rightNow, newTime, TIMES;

        function formatTime(date) {
          var ampm, hr, min, time;
          date = date || new Date();
          hr = date.getHours();
          min = date.getMinutes();
          if (min >= 30) {
            hr += 1;
            min = '00';
          } else {
            min = '30';
          }
          ampm = (hr >= 12 ? 'pm' : 'am');
          hr = (hr%12==0 ? 12 : hr%12);
          time = hr + ':' + min + ' ' + ampm;
          return time;
        }

        function indexArr(arr, item) {
          for (var i=0;i<arr.length;++i) {
            if (arr[i] === item) return i;
          }
        }

        function timeRules(times, min, max) {
          var minIndex = indexArr(times, min);
          var maxIndex = (typeof max != 'undefined' ? indexArr(times, max) + 1 : times.length);
          return times.slice(minIndex, maxIndex);
        }

        function timesArray() {
          var times = [];
          var hours, halfs;
          hours = buildTimes();
          halfs = buildTimes('30');
          times = times.concat(hours, halfs);
          times.sort(function (a, b) {
            return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
          });
          return times;
        }

        function buildTimes(min) {
          var times = [];
          for (var i=0;i<24;++i) {
            var hr, ampm;
            min = min || '00';
            hr = (i%12 ? i%12 : 12);
            ampm = (i >= 12 ? ' pm' : ' am');
            times.push(hr + ':' + min + ampm);
          }
          return times;
        }

        function parseDate(date, now) {
          date = new Date(date);
          date.setHours(now.getHours());
          date.setMinutes(now.getMinutes());
          date.setSeconds(0);
          return date;
        }

        function link(scope, el, attrs) {

          (function init() {
            TIMES = scope.times = timesArray();
            if (scope.defaultTime && !scope.currentTime) scope.currentTime = scope.defaultTime;
            if (scope.minTime || scope.maxTime) scope.times = timeRules(scope.times, scope.minTime, scope.maxTime);
          })();
          
          function createAvailableTimes() {
            if (newTime.getDate() == rightNow.getDate()) {
              scope.times = timeRules(TIMES, scope.baseTime, scope.maxTime);
            } else if (scope.minTime && (newTime.getDate() != rightNow.getDate())) {
              scope.times = timeRules(TIMES, scope.minTime, scope.maxTime);
            } else {
              scope.times = Array.prototype.slice.call(TIMES);
            }
          }

          scope.$watch('currentDate', function(dirty, clean) {
            rightNow = new Date();
            newTime = parseDate(dirty, rightNow);
            scope.baseTime = formatTime(newTime);
            createAvailableTimes();
            if (typeof indexArr(scope.times, scope.currentTime) == 'undefined') {
              scope.currentTime = null;
            }
          });

        }

        return {
          link: link,
          template: '<select ng-model="currentTime" ng-options="time as time for time in times"><option value="">Select One</option></select>',
          scope: {
            currentTime: '=ngModel',
            currentDate: '=',
            defaultTime: '=',
            maxTime: '=',
            minTime: '='
          }
        }
      }
    ]
  );
})(window);