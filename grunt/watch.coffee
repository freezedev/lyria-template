module.exports =
  options:
    livereload: true
  all:
    files: ['assets/**/*', 'stylus/**/*.styl', 'template/**/*.html', 'src/**/*.js', 'bower_components/*/**/*.js', 'bower_components/*/**/*.css']
    tasks: ['build:debug']
  grunt:
    files: ['gruntfile.coffee', 'grunt/*.coffee']
