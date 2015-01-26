module.exports =
  dist:
    options:
      namespace: '<%= package.name %>',
      base: 'src/'
    src: ['src/**/*.js'],
    dest: '<%= buildDebug %>/js/<%= package.name %>.js'
  all:
    options:
      footer: '//# sourceMappingURL=all.js.map'
      base: '<%= buildDebug %>/js'
    src: ['<%= buildDebug %>/js/**/*.js']
    dest: '<%= buildDebug %>/all.js'
