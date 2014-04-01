'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);

flickrfeedControllers.controller('FeedListCtrl', ['$scope', '$http', '$routeParams',
	function ($scope, $http, $routeParams) {
		// $scope.tag = $routeParams.tag;

		$scope.$watch('tag', function()
			{
				var newTag = $scope.tag;
				$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.tag + '&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
					if ($scope.tag === newTag) {
						$scope.feed = data;
					} else {
						console.log("not ok:" + newTag)
					}
				});
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
					var extract = descrPatt.exec($scope.post.description);
					if (extract == null) {
						$scope.description = $sce.trustAsHtml("<i>No descritption available for this picture</i>");
					} else {
						$scope.description = $sce.trustAsHtml(extract[1]);
					}

					break;
				}
			};
		});

		$scope.back = function() 
			{
		    	window.history.back();
		  	};
	}]);