'use strict';

var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require("browser-sync").create();
var minifyCss = require('gulp-clean-css');
var mainBowerFiles = require('main-bower-files');


// Lint Task
// Test all javascript files and make sure there are no errors
//
gulp.task('lint', function() {
    gulp.src('js/*.js')
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


//gulp.task('vendors',function () {
  //  gulp.src(mainBowerFiles('**/*.js',{includeDev:true}))
    //    .pipe(concat('vendor.js'))
      //  .pipe(gulp.dest('dist/'));
//});


// Compile Sass file in css file in the dist directory
gulp.task('sass', function() {
    return gulp.src('sass/desktop/style.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('sassMobile', function() {
    return gulp.src('sass/mobile/mobile.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

// Duplicate index.html in dist directory
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('dist/'));
});
gulp.task('php', function() {
    gulp.src('*.php')
        .pipe(gulp.dest('dist/'));
});

// Duplicate assets files in dist

gulp.task('assets',function () {
    gulp.src('assets/**')
        .pipe(gulp.dest('dist/assets'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    browserSync.init({
        server: "dist/",
        ghostMode: false
    });
    gulp.watch('js/*.js', ['lint']).on('change', browserSync.reload);
    gulp.watch('sass/desktop/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('sass/mobile/*.scss', ['sassMobile']).on('change', browserSync.reload);
    gulp.watch('**/index.html',['html']).on('change', browserSync.reload);
    gulp.watch('**/index.html',['php']).on('change', browserSync.reload);

});

// Default Task
gulp.task('default', ['lint', 'sass','sassMobile', 'watch', 'html','assets','php']);
gulp.task('build', ['lint', 'sass', 'html','assets','php']);