// -------------------------------------------------------------------------
// GET THINGS SET UP
// -------------------------------------------------------------------------

// Include Gulp and API
const   gulp = require('gulp'),
        {series, parallel} = require('gulp');

// General Plugins
const   browserSync = require('browser-sync').create(),
        changed = require('gulp-changed');

// HTML Plugins
const   htmlmin = require('gulp-htmlmin');

// CSS Plugins
const   sourcemaps = require('gulp-sourcemaps'),
        plumber = require('gulp-plumber'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        rename = require('gulp-rename');

// JS Plugins
const   uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        babel = require('gulp-babel');


// Image Plugins
const   imagemin = require('gulp-imagemin');


// -------------------------------------------------------------------------
// DEFINE PATHS
// -------------------------------------------------------------------------

const paths = {
    html: {
        src: './src/pages/*.html',
        dest: './dist/'
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
    video: {
        src: './src/assets/video/*',
        dest: './dist/assets/video/'
    },
    fonts: {
        src: './src/assets/fonts/*',
        dest: './dist/assets/fonts/'
    }
};


// -------------------------------------------------------------------------
// TASKS
// -------------------------------------------------------------------------

// HTML Task
html = () => {
    return gulp
        .src(paths.html.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
};

// CSS Task
style = () => {
    return gulp
        .src(paths.style.src, {sourcemaps: true})
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
scripts = () => {
    return gulp
        .src(paths.js.src, {sourcemaps: true})
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
images = () => {
    return gulp
        .src(paths.img.src)
        .pipe(changed(paths.img.dest))
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest(paths.img.dest))
        .pipe(browserSync.stream());
};

// Videos Task
video = () => {
    return gulp
        .src(paths.video.src)
        .pipe(gulp.dest(paths.video.dest))
        .pipe(browserSync.stream());
};

// Fonts Task
fonts = () => {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream());
};


// -------------------------------------------------------------------------
// WATCH
// -------------------------------------------------------------------------

// Initialize Watcher
watch = () => {
    browserSync.init({
        server:{
            baseDir: './',
            index: "src/pages/index.html"
        }
    });
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.style.src, style);
    gulp.watch(paths.js.src, scripts);
    gulp.watch(paths.img.src, images);
    gulp.watch(paths.video.src, video);
    gulp.watch(paths.fonts.src, fonts);
};


// -------------------------------------------------------------------------
// EXPORTS
// -------------------------------------------------------------------------

exports.default = parallel(html, style, scripts, images, video, fonts, watch);