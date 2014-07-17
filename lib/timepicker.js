(function(root) {
  var app = app || angular.module('timepicker', []);

  app.directive('timepicker', [
      function() {

        var rightNow, newTime;

        function formatTime(date) {
          var ampm, h, m;
          date = date || new Date();
          ampm = 'am';
          h = date.getHours();
          m = date.getMinutes();
          if(h>= 12){
            if(h>12) h -= 12;
            ampm= 'pm';
          }
          if(m<10) m= '0'+m;
          // fix h now
          h = (date.getHours()%12==0) ? '12' : date.getHours()%12;
          return h + ':' + m + ' ' + ampm;
        };

        function roundMinutes(date) {
          var min = date.getMinutes();
          date.setMinutes(0);
          if(min >= 30) {
            date.setHours(date.getHours()+1);
          } else {
            date.setMinutes(30);
          }
          return date;
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

        function makeTimesArr() {
          var times = [];
          var hours, halfs;
          hours = buildTimes();
          halfs = buildTimes('30');
          for (var i=0;i<24;++i) {
            times.push(hours[i]);
            times.push(halfs[i]);
          }
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

        function setDate(date) {
         rightNow = new Date();
         date = new Date(date);
         date.setHours(rightNow.getHours());
         date.setMinutes(rightNow.getMinutes());
         date.setSeconds(0);
         return date;
        }

        function link(scope, el, attrs) {

          var _times = makeTimesArr();
          scope.times = _times;

          if (scope.defaultTime && !scope.currentTime) {
            scope.currentTime = scope.defaultTime;
          }
          
          if (scope.minTime || scope.maxTime) {
            scope.times = timeRules(scope.times, scope.minTime, scope.maxTime);
          }
          
          function createAvailableTimes() {
            if (newTime.getDate() == rightNow.getDate()) {
              scope.times = timeRules(_times, scope.baseTime, scope.maxTime);
            } else {
              scope.times = _times;
            }
          }

          function resetTimes(date) {
            newTime = setDate(date);
            scope.baseTime = roundMinutes(newTime);
            scope.baseTime = formatTime(scope.baseTime);
          }

          scope.$watch('currentDate', function(dirty, clean) {
            resetTimes(dirty);
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
