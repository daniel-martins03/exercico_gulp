const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const paths = {
    styles: {
        src: 'source/styles/main.scss',
        dest: 'dist/css/'
    },
    images: {
        src: 'source/img/.jpg',
        dest: 'dist/images/'
    },
    scripts: {
        src: 'source/script.js',
        dest: 'dist/js/'
    }
};

function compileSass() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function minifyScripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

const build = gulp.series(
    gulp.parallel(compileSass, compressImages, minifyScripts)
);

exports.compileSass = compileSass;
exports.compressImages = compressImages;
exports.minifyScripts = minifyScripts;
exports.build = build;
exports.default = build;
