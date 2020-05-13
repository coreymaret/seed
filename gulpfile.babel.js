// -------------------------------------------------------------------------
"use strict";
// -------------------------------------------------------------------------
// GET THINGS SET UP
// -------------------------------------------------------------------------
// Include Gulp and API
import gulp from 'gulp';
import {series, parallel} from 'gulp';

// General Plugins
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import del from 'del';

// HTML Plugins
import htmlmin from 'gulp-htmlmin';

// CSS Plugins
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';

// JS Plugins
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import babel from 'gulp-babel';

// Image Plugins
import imagemin from 'gulp-imagemin';


// -------------------------------------------------------------------------
// DEFINE PATHS
// -------------------------------------------------------------------------

const paths = {
    html: {
        src: './src/pages/*.html',
        dest: './dist/pages/'
    },
    style: {
        src: './src/assets/scss/*.scss',
        dest: './dist/assets/css/'
    },
    js: {
        src: './src/assets/js/*.js',
        dest: './dist/assets/js/',
        location: 'scripts.min.js'
    },
    img: {
        src: './src/assets/img/*',
        dest: './dist/assets/img/'
    },
    fonts: {
        src: './src/assets/fonts/*',
        dest: './dist/assets/fonts/'
    },
    distFolder: {
        location: './dist/'
    }
};


// -------------------------------------------------------------------------
// TASKS
// -------------------------------------------------------------------------

// HTML Task
const html = () => {
    return gulp
        .src(paths.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
};

// CSS Task
const style = () => {
    return gulp
        .src(paths.style.src)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.style.dest))
        .pipe(browserSync.stream());
};

// JS Task
const scripts = () => {
    return gulp
        .src(paths.js.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat(paths.js.location))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
};

// Images Task
const images = () => {
    return gulp
        .src(paths.img.src)
        .pipe(plumber())
        .pipe(changed(paths.img.dest))
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream());
};

// Fonts Task
const fonts = () => {
    return gulp
        .src(paths.fonts.src)
        .pipe(plumber())
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
    };

// Clean dist folder
const clean = (done) => {
    del(paths.distFolder.location);
    done();
  };


// -------------------------------------------------------------------------
// SERVE
// -------------------------------------------------------------------------

// Initialize Server
const serve = () => {
    browserSync.init({
        server:{
            baseDir: './',
            index: "dist/pages/index.html"
        }
    });
};


// -------------------------------------------------------------------------
// WATCH
// -------------------------------------------------------------------------

// Initialize Watcher
const watch = () => {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.style.src, style);
    gulp.watch(paths.js.src, scripts);
    gulp.watch(paths.img.src, images);
    gulp.watch(paths.fonts.src, fonts);
};


// -------------------------------------------------------------------------
// EXPORTS
// -------------------------------------------------------------------------

exports.default = series(html, style, scripts, images, fonts, serve, watch);
exports.clean = clean;