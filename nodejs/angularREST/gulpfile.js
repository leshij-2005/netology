/**
* Gulp task to run the web server and live reload the changes in browser
*
* @usage
*   $ gulp webserver
*/

var gulp   = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
 gulp.src('')
   .pipe(server({
     livereload:       true,
     open:             true,
     log:              'debug',
     clientConsole:    true,
     defaultFile:      'index.html',
     fallback:  'app/index.html'
   }));
});
