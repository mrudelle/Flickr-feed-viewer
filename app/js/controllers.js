'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);

flickrfeedControllers.controller('FeedListCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
			$scope.feed = data;
		});
	}]);

flickrfeedControllers.controller('FeedPostCtrl', ['$scope','$routeParams', '$http',
	function ($scope, $routeParams, $http) {
		$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
			$scope.feed = data;
		});
		$scope.author = $routeParams.author;
		$scope.postId = $routeParams.postId;
	}]);