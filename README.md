##Timepicker Directive
An angular.js directive to pick times thats smart(ish) about time selection. It's aware of todays date and will only give you available times for each day, you can select some options like `min-time` and `max-time` as well as a `default-time` you'd like to have pre selected *[if available today]*. If you understand the angular controller $scope you shouldn't have a hard time keeping your everything moving, however to allow for some different functionality on change there's also a `change-event` you can pass a function to, and get that extra bit you need. 

Very simple solution with optimizations in mind -- Namely a better way of rendering time arrays in any interval, coming very soon.

##Demo
View the contents of `demo/index.html` && `demo/js/demo.js`
[Click Here](http://htmlpreview.github.io/?https://github.com/dhigginbotham/timepicker-directive/blob/master/demo/index.html)

##Usage
`<div timepicker ng-model="selectedTime" default-time="defaultTime" current-date="currentDate" change-event="updateDateAttr(date, time)"></div>`