'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);

flickrfeedControllers.controller('FeedListCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
			$scope.feed = data;
		});
	}]);

flickrfeedControllers.controller('FeedPostCtrl', ['$scope','$routeParams', '$http', '$sce',
	function ($scope, $routeParams, $http, $sce) {
		$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
			$scope.feed = data;
			for (var post in data.items) {
				if (data.items[post].link == "http://www.flickr.com/photos/"+ $routeParams.author +"/"+ $routeParams.postId +"/"){
					$scope.post = data.items[post];

					//generate the description
					var descrPatt = /<p>.+<p>.+<p>(.+)<\/p>/;
					$scope.description = $sce.trustAsHtml(
						descrPatt.exec($scope.post.description)[1]);
					
					break;
				}
			};
		});

		$scope.back = function() 
			{
		    	window.history.back();
		  	};
	}]);