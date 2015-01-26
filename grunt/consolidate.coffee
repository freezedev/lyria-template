module.exports =
  options:
    engine: 'handlebars'
  debug:
    options:
      local:
        livereload: true,
        mainModule: '<%= package.name %>',
        title: '<%= package.name %> - Development build',
    files:
      '<%= buildDebug %>/index.html': 'template/index.html'
  release:
    options:
      local:
        livereload: false,
        mainModule: '<%= package.name %>'
        title: '<%= package.name %>'
    files:
      '<%= buildRelease %>/index.html': 'template/index.html'
