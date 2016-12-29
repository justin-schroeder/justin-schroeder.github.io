/**
 * File: gulpfile.js
 *
 * Gulp task runner configuration
 */

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass         = require('gulp-sass'),
    notify       = require('gulp-notify'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat');


// TASK: scripts
gulp.task('scripts', function (){
    gulp.src('./scripts/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({
          title: "JavaScript processed.",
          message: "Concatenated and uglified.",
          sound: "Blow"
        }));
});


// TASK: styles
gulp.task('styles', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({
            output: 'compressed'
        }))
        .on('error', notify.onError({
          title: "Sass compilation failed.",
          message: "<%= error.message %>",
          sound: "Basso"
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({
          title: "Sass compiled.",
          message: "File: <%= file.relative %>",
          sound: "Pop"
        }));
});


// TASK: watch
gulp.task('watch', ['styles', 'scripts'], function (){
    gulp.watch('./sass/**/*.scss', ['styles']);
    gulp.watch('./scripts/**/*.js', ['scripts']);
});


// TASK: default
gulp.task('default', ['watch']);
