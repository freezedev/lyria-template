module.exports =
  options:
    livereload: true
  stylus:
    files: 'stylus/**/*.styl',
    tasks: ['newer:stylus:development']
  assetList:
    files: 'assets/**/*',
    tasks: ['newer:lyriaAssetList']
  scenes:
    files: 'assets/scenes/*',
    tasks: ['newer:lyriaScene']
  i18nData:
    files: 'assets/i18n/**/*.json',
    tasks: ['newer:lyriaData']
  template:
    files: 'template.html',
    tasks: ['newer:bower']
  concat:
    files: 'src/**/*.js',
    tasks: ['newer:amd_tamer']