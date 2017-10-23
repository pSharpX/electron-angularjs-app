const gulp = require('gulp');
const childProcess = require('child_process');
const electron = require('electron-prebuilt');
const srcCssFiles = 'app/assets/**/*.css';

gulp.task('default', () => {
  console.log('running default task');
});

gulp.task('run', () => {
  childProcess.spawn(electron, ['./app'], {stdio: 'inherit'});
});

gulp.task('styles', () => {
  console.log('compiling css files..');
});

gulp.task('watch', () => {
  gulp.watch(srcCssFiles, ['styles']);
});
