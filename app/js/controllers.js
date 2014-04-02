'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);

flickrfeedControllers.controller('Navbar',
	function ($scope, $routeParams, Tagger) {
		$scope.tag = Tagger;
	});

flickrfeedControllers.controller('FeedListCtrl',
	function ($scope, $http, $routeParams, Tagger) {
		$scope.tag = Tagger;
		$scope.tag.text = $routeParams.tag;
		$scope.$watch('tag.text', function()
			{
				var newTag = $scope.tag.text;
				$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.tag.text + '&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
					if ($scope.tag.text === newTag) {
						$scope.feed = data;
					}
				});
			});	
	});

flickrfeedControllers.controller('FeedPostCtrl',
	function ($scope, $routeParams, $http, $sce, Tagger) {
		$scope.tag = Tagger;
		$scope.tag.text = $routeParams.tag;
		// make the input not editable
		$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.tag.text + '&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
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
	});