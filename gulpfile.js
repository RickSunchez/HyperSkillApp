'use strict';

const gulp = require('gulp'); 
const minjs = require('gulp-uglify');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

gulp.task('js:build', function() {
    return gulp.src('./public/bundle/bundle.js')
        .pipe(minjs())
        .pipe(browserify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('../chrome-extension/'))
})