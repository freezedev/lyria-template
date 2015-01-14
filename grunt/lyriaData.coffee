module.exports =
  options:
    namespace: '<%= package.name %>'
  all:
    options:
      name: 'i18n'
    dest: 'build/debug/js/i18n.js',
    src: ['assets/i18n/**/*.json']