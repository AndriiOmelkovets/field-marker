var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css');

gulp.task('connect', function () {
  connect.server({
    port: 3000,
    livereload: true
  });
});

gulp.task('js', function () {
  gulp.src('app/js/**/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(rename('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('vendorjs', function () {
  gulp.src('app/js/vendor.js') 
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(rename('vendor.min.js'))
    .pipe(uglify()) 
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest('dist/vendor')); 
});

gulp.task('css', function () {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('vendorcss', function () {
  return gulp.src('node_modules/angular-material/angular-material.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('angular-material.min.css'))
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('watch', ['js', 'css', 'html'], function () {
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch('index.html', ['html']);

});

gulp.task('default', ['connect', 'js', 'css', 'html', 'watch']);