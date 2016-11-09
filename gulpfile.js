var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var rev = require('gulp-rev');
var minify = require('gulp-minify');
var nodemon = require('gulp-nodemon');

gulp.task('dev',()=>{
    nodemon({
        script:'bin/www',
        ignore:['public/**','node_modules'],
        env:{
            'NODE_ENV':'development'
        }
    })
})
