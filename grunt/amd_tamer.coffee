module.exports =
  dist:
    options:
      namespace: '<%= package.name %>',
      base: 'src/'
    src: ['src/**/*.js'],
    dest: 'build/debug/js/<%= package.name %>.js'
  all:
    options:
      footer: '//# sourceMappingURL=all.js.map'
      base: 'build/debug/js'
    src: ['build/debug/js/**/*.js']
    dest: 'build/debug/all.js'
