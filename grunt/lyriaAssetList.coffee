module.exports =
  options:
    namespace: '<%= package.name %>'
  all:
    dest: '<%= buildDebug %>/js/assetlist.js'
    src: ['assets/**/*', '!**/README.md']
    filter: 'isFile'
