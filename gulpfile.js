const { resolve } = require("path");
const gulp = require("gulp");
const if_ = require("gulp-if");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const touch = require("gulp-touch-fd");
const cleanCss = require("gulp-clean-css");

const isDev = () => !!process.env.DEBUG;

const themeDir = resolve("ckanext/js_tweaks/assets/theme");
const assetsDir = resolve("ckanext/js_tweaks/assets");

const build = () =>
  gulp
    .src(resolve(themeDir, "js-tweaks.scss"))
    .pipe(if_(isDev, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(if_(() => !isDev(), cleanCss()))
    .pipe(if_(isDev, sourcemaps.write()))
    .pipe(gulp.dest(resolve(assetsDir, "css")))
    .pipe(touch());

const watch = () =>
  gulp.watch(resolve(themeDir, "**/*.scss"), { ignoreInitial: false }, build);

exports.build = build;
exports.watch = watch;
