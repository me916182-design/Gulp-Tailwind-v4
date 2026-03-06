const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('sass');
const through2 = require('through2');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const tailwindcss = require('@tailwindcss/postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const { deleteAsync } = require('del');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const terser = require('gulp-terser');

const paths = {
  html: {
    pages: 'src/html/pages/**/*.html',
    watch: 'src/html/**/*.html',
    partials: 'src/html/partials/',
    dest: 'dist/',
  },
  styles: {
    src: 'src/main.css',
    watch: 'src/**/*.css',
    dest: 'dist/css/',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
  },
  ibs: {
    src: 'src/ibs/**/*',
    dest: 'dist/ibs/',
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/',
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts/',
  },
};

const isProd = process.env.NODE_ENV === 'production';

function clean() {
  return deleteAsync(['dist']);
}

function html() {
  return src(paths.html.pages)
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: paths.html.partials,
      })
    )
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return (
    src(paths.styles.src)
      .pipe(gulpIf(!isProd, sourcemaps.init()))
      .pipe(postcss([tailwindcss()]))
      .pipe(dest(paths.styles.dest))
      .pipe(rename({ suffix: '.min' }))
      .pipe(postcss([cssnano()]))
      .pipe(gulpIf(!isProd, sourcemaps.write('.')))
      .pipe(dest(paths.styles.dest))
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(newer(paths.scripts.dest))
    .pipe(dest(paths.scripts.dest))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function ibs() {
  return src(paths.ibs.src)
    .pipe(newer(paths.ibs.dest))
    .pipe(dest(paths.ibs.dest))
    .pipe(browserSync.stream());
}

const fs = require('fs');
const fsp = fs.promises;

async function copyDirRecursive(srcDir, destDir) {
  await fsp.mkdir(destDir, { recursive: true });
  const entries = await fsp.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      // If dest exists and is newer, skip (mimic gulp-newer)
      let copy = true;
      try {
        const [sStat, dStat] = await Promise.all([
          fsp.stat(srcPath),
          fsp.stat(destPath).catch(() => null),
        ]);
        if (dStat && dStat.mtimeMs >= sStat.mtimeMs) copy = false;
      } catch (e) {
        // ignore
      }
      if (copy) {
        await fsp.mkdir(path.dirname(destPath), { recursive: true });
        await fsp.copyFile(srcPath, destPath);
        // console.log('[images] ->', path.relative(process.cwd(), destPath));
      }
    }
  }
}

function images() {
  return (async () => {
    await copyDirRecursive(
      path.join(process.cwd(), 'src', 'images'),
      path.join(process.cwd(), 'dist', 'images')
    );
  })();
}

function fonts() {
  return src(paths.fonts.src).pipe(newer(paths.fonts.dest)).pipe(dest(paths.fonts.dest));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    open: false,
    notify: false,
  });

  watch(paths.html.watch, html);
  watch(paths.styles.watch, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.fonts.src, fonts);
}

const build = series(
  clean,
  parallel(html, scripts, ibs, fonts),
  styles,
  images
);

function setProd(done) {
  process.env.NODE_ENV = 'production';
  done();
}

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.ibs = ibs;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.dev = series(build, serve);
exports['build:prod'] = series(setProd, build);
