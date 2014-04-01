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

flickrfeedFilters.filter('split', function() {
		return function(input, splitchar) {
			return input.split(splitchar);
		};
});

flickrfeedFilters.filter('extractMessage', function() {
		return function(input) {
			var authorPatt = /<p>.+<p>.+<p>(.+)<\/p>/;
			return authorPatt.exec(input)[1];
		};
});

flickrfeedFilters.filter('handleUntitled', function() {
		return function(input) {
			return input === "" ? "Untitled" : input;
		};
});

flickrfeedFilters.filter('parseDate', function() {
		return function(input) {
			var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var authorPatt = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):\d{2}/;
			var ordinal = function(nb){
				var s = ["th","st","nd","rd"];
				var v = nb % 100;
				return nb+(s[(v-20)%10]||s[v]||s[0]);
			}
			var data = authorPatt.exec(input);
			return ordinal(data[3]) + " " + Months[data[2]-1] + " " + data[1] + " at " + data[4] + ":" + data[5];
		};
});