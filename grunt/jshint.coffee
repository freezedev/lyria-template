module.exports =
  options:
    jshintrc: '.jshintrc'
  assets:
    src: ['assets/**/*.js']
  source:
    src: ['src/**/*.js', '!src/generated/**/*.js']
  gruntfile:
    src: ['gruntfile.js']