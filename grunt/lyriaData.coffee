module.exports =
  options:
    namespace: '<%= package.name %>'
  all:
    options:
      name: 'i18n'
    dest: '<%= buildDebug %>/js/i18n.js',
    src: ['assets/i18n/**/*.json']
