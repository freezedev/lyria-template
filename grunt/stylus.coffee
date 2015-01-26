module.exports =
  options:
    paths: ['stylus/app', 'stylus/lyria']
    urlfunc: 'embedurl'
    use: [require('rupture')]
    import: ['nib', 'rupture', 'asset']
  debug:
    options:
      compress: false
      linenos: true
    files:
      '<%= buildDebug %>/css/<%= package.name %>.css': 'stylus/app/**/*.styl'
  release:
    options:
      compress: true
      linenos: false
    files:
      '<%= buildDebug %>/css/<%= package.name %>.css': 'stylus/app/**/*.styl'
