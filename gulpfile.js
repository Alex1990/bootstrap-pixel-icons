const Async = require('async')
const gulp = require('gulp')
const iconfont = require('gulp-iconfont')
const consolidate = require('gulp-consolidate')

const runTimestamp = Math.round(Date.now() / 1000)

gulp.task('iconfont', (done) => {
  const iconStream = gulp.src(['svg/*.svg'])
    .pipe(iconfont({
      fontName: 'bootstrap-pixel-icons',
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      timestamp: runTimestamp
    }))

  Async.parallel([
    cb => {
      iconStream.on('glyphs', (glyphs, options) => {
        gulp.src('templates/bootstrap-pixel-icons.css')
          .pipe(consolidate('lodash', {
            glyphs,
            fontName: 'bootstrap-pixel-icons',
            fontPath: './fonts/',
            className: 'px'
          }))
          .pipe(gulp.dest('./'))
          .on('finish', cb)
      })
    },
    cb => {
      iconStream
        .pipe(gulp.dest('fonts/'))
        .on('finish', cb)
    }
  ], done)
})
