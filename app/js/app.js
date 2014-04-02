'use strict';

var flickrfeedApp = angular.module('flickrfeedApp', [
  'flickrfeedControllers',
  'flickrfeedFilters',
  'ngRoute'
]);

flickrfeedApp.factory('Tagger', function(){
  return {text:''};
});

flickrfeedApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/feed/:tag', {
        templateUrl: 'templates/flickr-feed.html',
        controller: 'FeedListCtrl'
      }).
      when('/post/:tag/:author/:postId', {
        templateUrl: 'templates/flickr-post.html',
        controller: 'FeedPostCtrl'
      }).
      otherwise({
        redirectTo: '/feed/potato'
      });
  }]);