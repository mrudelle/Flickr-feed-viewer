'use strict';

var flickrfeedFilters = angular.module('flickrfeedFilters', [])

flickrfeedFilters.filter('extractAuthor', function() {
		return function(input) {
			var authorPatt = /\((.+)\)$/;
			return authorPatt.exec(input)[1];
		};
});