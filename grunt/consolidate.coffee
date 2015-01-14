module.exports =
  options:
    engine: 'handlebars'
  development:
    options:
      local:
        livereload: true,
        #scripts: templateScripts.development,
        #styles: templateStyles.development,
        mainModule: '<%= package.name %>',
        title: '<%= package.name %> - Development build',
        #description: lyriaConfig.description,
        #author: lyriaConfig.author
    files:
      'build/debug/index.html': 'template/index.html'
  production:
    options:
      local:
        livereload: false,
      #scripts: templateScripts.development,
      #styles: templateStyles.development,
        #mainModule: pkgFile.name,
        #title: '<%= lyriaConfig.title %> (Development build <%= buildVersion %>)',
  #description: lyriaConfig.description,
  #author: lyriaConfig.author
    files:
      'build/production/index.html': 'template/index.html'