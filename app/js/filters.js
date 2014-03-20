'use strict';

var flickrfeedFilters = angular.module('flickrfeedFilters', [])

flickrfeedFilters.filter('extractAuthor', function() {
		return function(input) {
			var authorPatt = /\((.+)\)$/;
			return authorPatt.exec(input)[1];
		};
});

flickrfeedFilters.filter('toInternalLink', function() {
		return function(input) {
			var authorPatt = /\/photos\/(.+)\/(.+)\/$/;
			var data = authorPatt.exec(input)
			return "#/post/" + data[1] + "/" + data[2];
		};
});