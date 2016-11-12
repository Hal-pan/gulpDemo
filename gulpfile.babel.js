import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browserSync from 'browser-sync'

const loadPlugins = plugins(),
    browsers = browserSync.create(),
    path = {
        "src": "src",
        "dist": "dist"
    },
    {
        sourcemaps,
        autoprefixer,
        sass
    } = loadPlugins;

gulp.task('scss', () =>
    gulp.src(`${path.src}/css/**.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write(`maps`))
    .pipe(gulp.dest(`${path.dist}/css`))
    .pipe(browsers.stream())
);

// 静态服务器
gulp.task('browser', () => {
    browsers.init({
        server: {
            baseDir: "./",
            directory: true
        },
        files: [`${path.src}/css/**.scss`, `${path.dist}/js/**.js`, `${path.dist}/page/**.html`],
        browser: "google chrome"
    });

    gulp.watch(`${path.src}/css/**.scss`, ["scss"]);

    browsers.watch(`${path.dist}/page/**.html`).on("change", browser.reload);

    browsers.watch(`${path.dist}/js/**.js`).on("change", browser.reload);
});

gulp.task("default", ['scss', 'browser']);
