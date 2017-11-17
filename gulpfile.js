const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const image = require('gulp-image');
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const minify = require('gulp-minify');

const env = process.env.NODE_ENV || 'development';
const isDev = env == 'development';

// Автоперезагрузка при изменении файлов в папке `dist`:
// Принцип: меняем файлы в `/src`, они обрабатываются и переносятся в `dist` и срабатывает автоперезагрузка.
// Это таск нужен только при локальной разработке.
gulp.task('livereload', () => {
    browserSync.create();

    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        browser: 'google chrome',
        files: [
            'dist/**/*.*'
        ]
    });
});

gulp.task('styles', () => {
    gulp.src('src/less/main.less')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('img', () => {
    gulp.src('src/img/**/*.*')
    .pipe(gulpIf(!isDev, image()))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('js', () => {
    gulp.src('src/js/scripts.js')
    .pipe(gulpIf(!isDev, minify({noSource: true, mangle: true})))
    .pipe(gulpIf(!isDev,rename('scripts.js')))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', () => {
    gulp.src('src/index.ejs')
    .pipe(ejs().on('error', gutil.log))
    .pipe(rename('index.html'))
    .pipe(gulpIf(!isDev, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('./dist'));
});

// Отслеживание изменений в файлах, нужно только при локальной разработке
gulp.task('watch', () => {
    gulp.watch('src/less/**/*.less', ['styles']);
    gulp.watch('src/**/*.ejs', ['html']);
    gulp.watch('src/img/**/*.*', ['img']);
    gulp.watch('src/js/**/*.*', ['js']);
});

gulp.task('default', ['styles', 'html', 'img', 'js', 'livereload', 'watch']);
gulp.task('prod', ['styles', 'html', 'img', 'js']);
