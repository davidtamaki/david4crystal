'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var dotenv = require('dotenv').config()

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js and set env variables 
gulp.task('build-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(replace('${INVITE_CODE}', process.env.INVITE_CODE))
        .pipe(replace('${GOOGLE_APPS_SCRIPT_POST_URL}', process.env.GOOGLE_APPS_SCRIPT_POST_URL))
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// default task
gulp.task('default', gulp.series('sass', 'build-js'));

