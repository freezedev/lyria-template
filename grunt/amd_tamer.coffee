module.exports =
  options:
    namespace: '<%= package.name %>',
    base: 'src/'
  dist:
    src: ['src/**/*.js'],
    dest: 'build/debug/js/<%= package.name %>.js'
  all:
    options:
      footer: '//# sourceMappingURL=all.js.map'
    src: ['build/debug/js/**/*.js']
    dest: 'build/debug/all.js'