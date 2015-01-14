module.exports = (grunt) ->
  require('time-grunt')(grunt)

  require('load-grunt-config') grunt,
    jitGrunt:
      staticMappings:
        lyriaData: 'grunt-lyria-assets'
        lyriaAssetList: 'grunt-lyria-assets'
        lyriaScene: 'grunt-lyria-assets'

  grunt.registerTask 'prebuild', 'Task before building the project', ['lyriaScene', 'lyriaAssetList', 'lyriaData',
                                                                      'amd_tamer:dist']
  grunt.registerTask 'lint', 'Lints JavaScript and CSS files', ['jshint']

  grunt.registerTask 'development', 'Development build', ['clean:build', 'prebuild', 'copy', 'bowercopy',
                                                          'stylus:development', 'amd_tamer:all',
                                                          'clean:build_debug_js',
                                                          'consolidate:development']
  grunt.registerTask 'production', 'Production build', ['clean', 'prebuild', 'bowercopy:production', 'uglify',
                                                        'copy', 'stylus:production', 'consolidate:production']
  grunt.registerTask 'pack', 'Packs project', ['production', 'compress']
  grunt.registerTask 'deploy', 'Builds project in production mode and starts a local server', ['production', 'connect']

  grunt.registerTask 'build', 'Builds the default project', ['development']
  grunt.registerTask 'default', 'Default task', ['development']

  # The future in order
  grunt.registerTask 'observe', 'Default task', ['development', 'watch']
