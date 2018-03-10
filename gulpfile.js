var gulp = require('gulp');//基础库
var sass = require('gulp-sass');//sass库
var js = require('gulp-uglify');//压缩js
var watch = require('gulp-watch');//监控操作
var css = require('gulp-minify-css');//压缩css
var html = require('gulp-htmlmin');//压缩html
var png = require('gulp.spritesmith');//合并雪碧图
var load = require('gulp-livereload');//自动加载文档
//sass编译为css
gulp.task('sass',function () {
   return  gulp.src('./sass/*.scss')
       .pipe(sass())
       . pipe(gulp.dest('./sass'))
       .pipe(load());
});
//压缩js
gulp.task('js',function () {
    return gulp.src('./js/*.js')
        .pipe(js())
        .pipe(gulp.dest('js'))
});
//压缩css
gulp.task('cssminify',function () {
    return gulp.src('./sass/*.css')
        .pipe(css())
        .pipe(gulp.dest('sass'))

});
gulp.task('minify',function () {
    return gulp.src('./sass/index.css')
        .pipe(css())
        .pipe(gulp.dest('sass'))

});
//压缩html
gulp.task('minhtml',function () {
   return gulp.src('./index.html')
       .pipe(html())
       .pipe(gulp.dest('./'))
});
//监视sass变化
gulp.task('item',function () {
    load.listen();
    return watch('./sass/*.scss',function () {
        gulp.src('./sass/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./sass'))
    })
});
//合成雪碧图
gulp.task('default',['sass','item','cssminify','minhtml','minify'],function () {
    return gulp.src('./img/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: './sass/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate:"css/handlebarsStr.css"//注释2
        }))
        .pipe(gulp.dest('img'));
});


