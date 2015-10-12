/**
 * Created by cstlaurent on 12/1/2014.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src('tests/tests.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});