const gulp = require('gulp');
//transpile js
gulp.task('webpack',()=>{
    const webpack=require('webpack-stream');
    const config=require('./webpack.config.js')
    gulp.src('./js/**/*.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('../www/js'));
});
//transpile less
gulp.task('less',()=>{
    const less = require('gulp-less');
    gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('../www/css'));
});

gulp.task('watch',()=>{
    gulp.watch('less/**/*.less',['less']);
    gulp.watch('js/**/*.js',['webpack']);
})

gulp.task('default',['webpack','less']);
