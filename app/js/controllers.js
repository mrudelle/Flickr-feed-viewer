'use strict';

var flickrfeedControllers = angular.module('flickrfeedControllers', []);

flickrfeedControllers.controller('Navbar',
	function ($scope, $location, Tagger) {
		$scope.tag = Tagger;
		console.log($location.path() + " and " +  !/^\/feed\//.test($location.path()))
		$scope.disableSearch = function() 
			{
				return !/^\/feed\//.test($location.path());
			};
	});

flickrfeedControllers.controller('FeedListCtrl',
	function ($scope, $http, $routeParams, $location, Tagger) {
		$scope.tag = Tagger;
		$scope.loading = true;
		$scope.emptylist = false;
		$scope.tag.text = $routeParams.tag;
		$scope.$watch('tag.text', function()
			{
				$scope.loading = true;
				$scope.emptylist = false;
				var newTag = $scope.tag.text;
				$http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne?tags=' + $scope.tag.text + '&tagmode=all&format=json&jsoncallback=JSON_CALLBACK').success(function(data) {
					if ($scope.tag.text === newTag) {
						$scope.loading = false;
						$scope.feed = data;
						if ($scope.feed.items.length === 0) {
							$scope.emptylist = true;
						}
						// avoid text to be inserted when we empty tthe input field
						if ($scope.tag.text !== ""){
							$location.path("/feed/" + $scope.tag.text);
						}
					}
				});
			});	
	});

flickrfeedControllers.controller('FeedPostCtrl',
	function ($scope, $routeParams, $http, $sce, Tagger) {
		$scope.tag = Tagger;
		$scope.tag.text = $routeParams.tag;
		$scope.loading = true;
		$scope.notfound = false;
		$scope.author = $routeParams.author;
		$scope.postId = $routeParams.postId;
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

			$scope.loading = false;
			if ($scope.post === undefined) {
				$scope.notfound = true;
			}
		});

		$scope.back = function() 
			{
		    	window.history.back();
		  	};
	});