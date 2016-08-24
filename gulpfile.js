var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename');

var themeName = "minimalui";
var outputDir = './dist/' + themeName;

gulp.task('less', function() {
	return gulp.src('./styles/main.less')
		.pipe(less())
		.pipe(rename('style.css'))
		.pipe(gulp.dest(outputDir + '/styles/'));
});


// The build task that compiles
// all files into one
gulp.task('build', ['less']);