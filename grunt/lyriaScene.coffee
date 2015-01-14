module.exports =
  options:
    namespace: '<%= package.name %>'
    shortNames: true
  scenes:
    files: [{
      dest: 'build/debug/js/scenelist.js',
      src: ['assets/scenes/*'],
      filter: 'isDirectory'
    }]
  prefabs:
    options:
      name: 'prefablist',
      entryFile: 'prefab.js',
      markupFile: 'prefab.html'
    files: [{
      dest: 'build/debug/js/prefablist.js',
      src: ['assets/prefabs/*'],
      filter: 'isDirectory'
    }]