const gulp = require('gulp')
const iconfont = require('gulp-iconfont')
const runTimestamp = Math.round(Date.now() / 1000)

gulp.task('iconfont', () => {
  return gulp.src(['svg/*.svg'])
    .pipe(iconfont({
      fontName: 'bootstrap-pixel-icons',
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      timestamp: runTimestamp
    }))
    .pipe(gulp.dest('fonts/'))
})
