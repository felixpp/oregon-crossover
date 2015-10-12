/**
 * Created by fperreault on 12/10/2015.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src('tests/tests.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});