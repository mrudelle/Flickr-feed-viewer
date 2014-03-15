'use strict';

var flickrfeedApp = angular.module('flickrfeedApp', []);


flickrfeedApp.controller('FeedListCtrl', function ($scope, $http) {
  $http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
    $scope.feed = data;
  });
});