'use strict';

var flickrfeedApp = angular.module('flickrfeedApp', [
  'flickrfeedControllers',
  'flickrfeedFilters',
  'ngRoute'
]);

flickrfeedApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/feed', {
        templateUrl: 'templates/flickr-feed.html',
        controller: 'FeedListCtrl'
      }).
      when('/post/:author/:postId', {
        templateUrl: 'templates/flickr-post.html',
        controller: 'FeedPostCtrl'
      }).
      otherwise({
        redirectTo: '/feed'
      });
  }]);