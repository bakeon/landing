'use strict';

let gulp = require('gulp');

// Include Plugins
let jshint = require('gulp-jshint');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let browserSync = require("browser-sync").create();
let minifyCss = require('gulp-clean-css');
let mainBowerFiles = require('main-bower-files');


// Lint Task
// Test all javascript files and make sure there are no errors
//
gulp.task('lint', function() {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(gulp.dest('public/js'));
});

gulp.task('vendors',function () {
    gulp.src(mainBowerFiles('**/*.js',{includeDev:true}))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/'));
});

// Compile Sass file in css file in the dist directory
gulp.task('sass', function() {
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('public/css'));
});

// Duplicate index.html in dist directory
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(gulp.dest('public/'));
});

//Duplicate functions files in dist dir

gulp.task('functions',function () {
    gulp.src('functions/**')
        .pipe(gulp.dest('public/functions'));
});

// Duplicate assets files in dist

gulp.task('assets',function () {
    gulp.src('assets/**')
        .pipe(gulp.dest('public/assets'));
});

gulp.task('views',function () {
    gulp.src('views/*.mst')
        .pipe(gulp.dest('public/views'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    browserSync.init({
        server: "public/",
        ghostMode: false
    });
    gulp.watch('js/*.js', ['lint']).on('change', browserSync.reload);
    gulp.watch('sass/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('**/index.html',['html']).on('change', browserSync.reload);
    gulp.watch('views/*.mst',['views']).on('change', browserSync.reload);
    gulp.watch('functions/*.php',['functions']).on('change', browserSync.reload);

});

// Default Task
gulp.task('default', ['lint', 'sass', 'watch', 'html','assets','views']);
gulp.task('build', ['lint', 'sass', 'html','assets','views','vendors']);