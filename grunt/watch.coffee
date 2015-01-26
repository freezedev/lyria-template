module.exports =
  options:
    livereload: true
  all:
    files: ['assets/**/*', 'stylus/**/*.styl', 'template/**/*.html', 'src/**/*.js', 'bower_components/*/**/*.js', 'bower_components/*/**/*.css']
    tasks: ['development']
  grunt:
    files: ['gruntfile.coffee', 'grunt/*.coffees']
