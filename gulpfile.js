/* jshint node: true, strict: true */
'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	mocha = require('gulp-mocha');

var paths = {
	scripts: ['./js/*.js', './tests/*.js', '!./gulpfile.js']
};

gulp.task('lint', function() {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
	return gulp.src('./tests/*.js')
		.pipe(mocha({reporter: 'dot'}));
});

gulp.task('default', ['lint', 'test']);