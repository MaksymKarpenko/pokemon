"use strict";
const config = require('./gulpconfig.js');

const gulp = require('gulp');
//css
const less = require('gulp-less');

//js
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

//server
const connect = require('gulp-connect');

//browser
const browserSync = require('browser-sync').create();


//CSS task, less -> css
gulp.task('css', () =>{
	return gulp.src(config.paths.stylesheets)
		.pipe(less())
		.pipe(gulp.dest(config.paths.build + "/css"))
});

//js task, es6 ->es5 + modules
gulp.task('js', ()=>{
	 return browserify({
	 	entries: config.paths.app, 
	 	debug: true
	})
        .transform("babelify", {presets:["es2015",]})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(config.paths.build + '/js'));
});

//html task
gulp.task('html', ()=>{
	return gulp.src(config.paths.index)
		.pipe(gulp.dest(config.paths.build))
});

//server 
gulp.task('server', ()=>{
	connect.server({
		root: config.paths.build,
		port: config.port
	});
});

//gulp serve task - initializes browser synchronization
gulp.task('serve', ['server'], function(){
	browserSync.init(null, config.browserSync);
});
//watchers
gulp.task('watch', ()=>{
	gulp.watch(config.paths.stylesheets, ['css']);
	gulp.watch(config.paths.index, ['html']);
	gulp.watch(config.paths.js, ['js']);

});

gulp.task('default', ['css', 'js', 'html', 'serve', 'watch'])

