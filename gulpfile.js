var gulp = require('gulp'),
cleanCSS = require('gulp-clean-css') ;

gulp.task('style', function(){
    return gulp.src("./lib/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist"))
});

gulp.task('w1', function(){
    gulp.watch("./lib/*.css",['style']);
});

gulp.task('default',['style','w1']);