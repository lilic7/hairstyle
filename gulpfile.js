var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

function browser_sync() {
    browserSync.init(null, {
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
}

function Sass(){
    return gulp.src("sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
}


gulp.task('default', gulp.series(Sass, gulp.parallel(watch, browser_sync)));