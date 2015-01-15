module.exports =
  options:
    paths: ['stylus/app', 'stylus/lyria']
    urlfunc: 'embedurl'
    use: [require('rupture')]
    import: ['nib', 'rupture', 'asset']
  development:
    options:
      compress: false
      linenos: true
    files:
      'build/debug/css/<%= package.name %>.css': 'stylus/app/**/*.styl'
  production:
    options:
      compress: true
      linenos: false
    files:
      'build/debug/css/<%= package.name %>.css': 'stylus/app/**/*.styl'
