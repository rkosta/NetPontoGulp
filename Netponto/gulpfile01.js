var gulp = require('gulp');
var filter = require('gulp-filter');
var bowerFiles = require('gulp-main-bower-files');
var flatten = require('gulp-flatten');
var imagemin = require('gulp-imagemin');
var del = require('del');
var inject = require('gulp-inject');
var addsrc = require('gulp-add-src');
var sequence = require('gulp-sequence');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');;
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');
var debug = require('gulp-debug');
var sort = require('gulp-sort');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');

var config = {

    mainBowerFilesOverride: {
        overrides: {
            bootstrap: {
                main: [
                    './dist/js/bootstrap.js',
                    './dist/css/*.*',
                    './dist/fonts/*.*'
                ]
            }
        }
    },
    dest: 'dist/'
};

var vendorScripts = function () {
    return gulp.src('./bower.json')
              .pipe(bowerFiles(config.mainBowerFilesOverride))
              .pipe(filter('**/*.js'))
              .pipe(flatten());
};

var appScripts = function () {
    return gulp.src('./app/js/*.js');
};

//var appScripts = function () {
//    return gulp.src('./app/js/*.js')
//              .pipe(eslint('eslint.json'))
//                .pipe(eslint.result(function (result) {
//                    console.log('ESLint result: ' + result.filePath);
//                    console.log('# Messages: ' + result.messages.length);
//                    console.log('# Warnings: ' + result.warningCount);
//                    console.log('# Errors: ' + result.errorCount);
//                }))
//                .pipe(eslint.format())
//                .pipe(eslint.failAfterError());
//};

var onError = function onError(err) {
    console.log(err);
    notifier.notify({
        'title': 'Error',
        'message': err.message
    });
}

var appScripts = function () {
    return gulp.src('./app/js/*.js')
                .pipe(plumber({
                    errorHandler: onError
                }))
                .pipe(eslint('eslint.json'))
                .pipe(eslint.result(function (result) {
                    console.log('ESLint result: ' + result.filePath);
                    console.log('# Messages: ' + result.messages.length);
                    console.log('# Warnings: ' + result.warningCount);
                    console.log('# Errors: ' + result.errorCount);
                }))
                .pipe(eslint.format())
                .pipe(eslint.failAfterError());
};

//var styles = function(){
//  return gulp.src('./bower.json') 
//            .pipe(bowerFiles(config.mainBowerFilesOverride))
//            .pipe(filter(['**/*.css','!**/*.min.css']))
//            .pipe(addsrc('./app/css/*.css')) 
//            .pipe(flatten());  
//};

var styles = function () {
    return gulp.src('./bower.json')
                //.pipe(debug({ title: 'src' }))
              .pipe(bowerFiles(config.mainBowerFilesOverride))
                //.pipe(debug({ title: 'bower files' }))
              .pipe(filter(['**/*.css', '!**/*.min.css']))
                .pipe(debug({ title: 'filter' }))
              .pipe(addsrc('./app/css/*.css'))
                //.pipe(debug({ title: 'more css' }))
              .pipe(flatten());
    //.pipe(debug({ title: 'flaten' }));
};


gulp.task('scripts', function () {

    return merge(vendorScripts(), appScripts())
            .pipe(gulp.dest(config.dest + 'js'));

});

gulp.task('styles', function () {

    return styles()
            .pipe(gulp.dest(config.dest + 'css'));

});

gulp.task('images', function () {

    return gulp.src('app/img/*')
			.pipe(imagemin())
            .pipe(gulp.dest(config.dest + 'img'));

});

gulp.task('html', function () {

    var target = gulp.src('app/index.html');

    var sources = gulp.src([config.dest + 'css/*',
                            config.dest + 'js/*']);

    return target.pipe(inject(sources, { ignorePath: 'dist/', addRootSlash: false }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('clean', function () {
    return del('dist/*');
});

//gulp.task('watch', function(){

//    gulp.watch('./app/css/*.css', ['styles']);

//})

gulp.task('watch', function () {

    gulp.watch('./app/css/*.css', ['styles'])
        .on('change', browserSync.reload);;

})

gulp.task('sync', function () {
    browserSync.init({
        proxy: "localhost/Netponto/dist/"
    });
});

gulp.task('deploy', sequence(['styles', 'scripts', 'images'], 'html', 'sync', 'watch'));

//gulp.task('deploy', sequence(['styles', 'scripts', 'images'], 'html', 'watch'));

//gulp.task('deploy', sequence(['styles', 'scripts', 'images'], 'html'));


//gulp.task('prodScripts', function () {

//    return merge(vendorScripts(), appScripts())
//        .pipe(order(['jquery.js', 'angular.js', 'bootstrap.js', 'controllers.js']))
//        .pipe(concat('app.js'))
//            .pipe(gulp.dest(config.dest + 'js'));

//});

//gulp.task('prodScripts', function () {

//    return merge(vendorScripts(), appScripts())
//            .pipe(order(['jquery.js', 'angular.js', 'bootstrap.js', 'controllers.js']))
//            .pipe(concat('app.js'))
//            .pipe(uglify())
//            .pipe(gulp.dest(config.dest + 'js'));

//});

gulp.task('prodScripts', function () {

    return merge(vendorScripts(), appScripts())
            .pipe(order(['jquery.js', 'angular.js', 'bootstrap.js', 'controllers.js']))
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(config.dest + 'js'));

});



//gulp.task('prodStyles', function () {

//    return styles()
//            .pipe(concat('all.css'))
//            .pipe(gulp.dest(config.dest + 'css'));

//});

//gulp.task('prodStyles', function () {

//    return styles()
//            .pipe(concat('all.css'))
//            .pipe(cssnano())
//            .pipe(gulp.dest(config.dest + 'css'));

//});

gulp.task('prodStyles', function () {

    return styles()
            .pipe(concat('all.css'))
            .pipe(sourcemaps.init())
            .pipe(cssnano())
            .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(config.dest + 'css'));

});
gulp.task('prodScripts', function () {

    return merge(vendorScripts(), appScripts())
            .pipe(order(['jquery.js', 'angular.js', 'bootstrap.js', 'controllers.js']))
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest(config.dest + 'js'));

});

npw

