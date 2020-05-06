# Seed

Gulp 4 with browser-sync to refresh the browser and watch for changes in html, sass, js or other media assets added to src folder during development.
gulp, browser-sync, sass, gulp-autoprefixer, gulp-concat, gulp-uglify, gulp-imagemin, gulp-plumber, gulp-sourcemaps, gulp-htmlmin

## Getting Started

### Prerequisites

Node.js, npm

```
https://nodejs.org/en/download/
```

You will need to head over to Node.js and download the latest installer.

```
install npm
```

After installation completes with default settings, you will need to install node.js' package manager - npm.

### Initializing your new project to create a package.json

```
cd c:/your/root
```

You will need to cd into your project's root directory using terminal.

```
npm init
```

Once you are in the root directory, run npm init to build a package.json file so we can start using dependencies (plugins).

```
npm install
```

Still in the root directory, we use npm install to install all dependencies in this 'seed' repository.

## Running Gulp to build our /dist folder, watch for changes, and if changes are made, refresh the browser with those new changes

```
gulp
```

## Built With

* [gulp](https://www.npmjs.com/package/gulp) - For task running and watching files
* [browser-sync](https://www.npmjs.com/package/browser-sync) - Live reloading of changes and injection
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) - Compiling SASS to CSS
* [gulp-changed](https://www.npmjs.com/package/gulp-changed) - Save time by detecting if certain files have been changed
* [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) - Minifying HTML
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - Mapping the compiled CSS to its source for development
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - Prevent pipe breaking caused by errors from gulp plugins
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - CSS post-processing adding vendor prefixes and checking code
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) - Renaming our minified and concatenated files
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Minifying and compressing Javascript
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) - Combining multiple Javascript files into a minified version to eliminate HTTP requests
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - Image compression
