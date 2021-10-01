const { src, dest, watch, series } = require("gulp");

// CSS, SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

// IMG
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function compileCSS(done) {
    src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe( sass({
            outputStyle: "expanded"
        }) )
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write("."))
        .pipe( dest("build/css"));
    done();
}

function images(done) {
    src("src/img/**/*")
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(dest("build/img"));

    done();
}

function webpVersion(done) {
    const options = {
        quality: 50
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(options))
        .pipe(dest("build/img"));
    done();
}

function avifVersion(done) {
    const options = {
        quality: 50
    }
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
        .pipe(dest("build/img"));
    done();
}

function dev() {
    watch("src/scss/**/*.scss", compileCSS);
    watch("src/img/**/*", images);
}

exports.compileCSS = compileCSS;
exports.dev = dev; 
exports.images = images; 
exports.webpVersion = webpVersion; 
exports.avifVersion = avifVersion; 
exports.default = series( compileCSS, dev );