'use strict';

var flickrfeedApp = angular.module('flickrfeedApp', []);


flickrfeedApp.controller('FeedListCtrl', function ($scope) {
  $scope.picture1 = "Picture #1";
  $scope.picture2 = "Picture #2";
});