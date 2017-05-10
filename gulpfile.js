'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var less = require('gulp-less');
var csso = require('gulp-csso');
var csslint = require('gulp-csslint');
var useref = require('gulp-useref');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');

var webpack = require('gulp-webpack');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var appList = [
	'src/',
	'src/components/'
]

var src = {};

src.less = [];
for (var i = 0; i < appList.length; i++) {	
	src.less.push(appList[i] + '*.less')
}

src.js = []
for (var i = 0; i < appList.length; i++){
	src.js.push(appList[i] + '*.jsx')
	src.js.push(appList[i] + '*.js')
}

gulp.task('watch', function(){
	gulp.watch(src.less, ['css']);
	gulp.watch(src.js, ['js']);
});

gulp.task('css', function(){
	return gulp.src(src.less)
		.pipe(plumber())
		.pipe(less())
		.pipe(concat('style.css'))
		.pipe(useref())
		.pipe(csscomb())
		.pipe(csslint())
		.pipe(csso())
		.pipe(gulp.dest('./build/'));
});

var webpackConfig = require('./webpack.config');
gulp.task('js', function(){
	return gulp.src(src.js)
		.pipe(plumber())
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(uglify())
		. pipe(gulp.dest(__dirname + '/dist/'))
});
gulp.task('webpack', function(){
	return gulp.src('./dist/main.js')
		.pipe(plumber())
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./build/'))
});


gulp.task('init', ['css', 'js']);

gulp.task('default', ['init', 'watch']);