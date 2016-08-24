var gulp = require('gulp'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence');

var themeName = "minimalui";

var outputDir = './dist/' + themeName;

var deploymentDir = '../codecup.io/content/themes/'


gulp.task('less', function() {
	return gulp.src('./styles/main.less')
		.pipe(less())
		.pipe(rename('style.css'))
		.pipe(gulp.dest(outputDir + '/assets/styles/'));
});

gulp.task('js', function() {
	return gulp.src('./scripts/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest(outputDir + '/assets/scripts/'));
});

gulp.task('assets', function() {
	return gulp.src('./assets/**/*').pipe(gulp.dest(outputDir + '/assets'))
});

gulp.task('templates', function() {
	return gulp.src('./templates/**/*').pipe(gulp.dest(outputDir))
})


// The build task that compiles
// all files into one
gulp.task('build', ['less', 'js', 'assets', 'templates']);

// Deploy the files to deploymentDir
gulp.task('deploy', function() {
	return gulp.src(outputDir + '/**/*').pipe(gulp.dest(deploymentDir + themeName));
});

// Watch server
gulp.task('watch', function() {
	gulp.watch(['./styles/**/*.less', './scripts/**/*.js'], function() {
		runSequence('build', 'deploy');
	});
});