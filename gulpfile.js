var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var browserSync = require("browser-sync").create();

function browser_sync() {
    browserSync.init({
        proxy: 'hairstyle.app',
        files: [
            'public/*.html',
            'public/*/*.html'
        ],
        port: 7000
    });
}

function watch() {
    gulp.watch("sass/*.sass", Sass);
    gulp.watch("pug/*.pug", renderPUGtoHTML);
    gulp.watch("pug/*/*.pug", renderPUGtoHTML);
}

function renderPUGtoHTML() {
    return gulp.src("pug/*.pug")
        .pipe(pug({pretty: true, debug: true, compileDebug: true}))
        .pipe(gulp.dest("public"))
        .pipe(browserSync.stream({once: true}));
}

function Sass(){
    return gulp.src("sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
}

gulp.task('default', gulp.series(Sass, renderPUGtoHTML, gulp.parallel(watch, browser_sync)));