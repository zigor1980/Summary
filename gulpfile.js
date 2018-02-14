const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('images', function () {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/img'))
});

gulp.task('clean:docs', function(callback){
    del(['docs/**/*', '!docs/img', '!docs/img/**/*'], callback)
});

gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./docs/css'));
});

gulp.task('styles', function () {
    return gulp.src(['src/css/*.css'])
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('docs/css'))
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'))
});

gulp.task('fonts-fa', function() {
    return gulp.src('src/webfonts/*')
        .pipe(gulp.dest('docs/webfonts'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('docs'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/*.scss', ['sass']);
});

gulp.task('build', function (callback) {
    runSequence(['sass', 'styles', 'images', 'fonts', 'fonts-fa', 'html'],callback)
});
