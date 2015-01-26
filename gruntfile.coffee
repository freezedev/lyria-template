module.exports = (grunt) ->
  require('time-grunt')(grunt)

  require('load-grunt-config') grunt,
    jitGrunt:
      staticMappings:
        lyriaData: 'grunt-lyria-assets'
        lyriaAssetList: 'grunt-lyria-assets'
        lyriaScene: 'grunt-lyria-assets'
    data:
      buildDebug: 'build/debug'
      buildRelease: 'build/release'

  grunt.registerTask 'prebuild', 'Task before building the project', ['lyriaScene', 'lyriaAssetList', 'lyriaData',
                                                                      'amd_tamer:dist']
  grunt.registerTask 'lint', 'Lints JavaScript and CSS files', ['jshint']


  grunt.registerTask 'build:debug', 'Debug build', ['clean:build', 'prebuild', 'copy:assets', 'copy:root', 'bowercopy',
                                                          'stylus:debug', 'amd_tamer:all',
                                                          'clean:build_debug_js',
                                                          'consolidate:debug']
  grunt.registerTask 'build:release', 'release build', ['build:debug', 'copy:release', 'uglify',
                                                        'stylus:release', 'consolidate:release']
  grunt.registerTask 'pack', 'Packs project', ['build:release', 'compress']
  grunt.registerTask 'deploy', 'Builds project in release mode and deploys to Github Pages', ['clean:gh_pages',
                                                                                                 'build:release',
                                                                                                 'gh-pages']

  grunt.registerTask 'run', 'Builds the project and serves it', ['build:debug', 'connect']

  grunt.registerTask 'test', ['lint']

  # The future in order
  grunt.registerTask 'observe', ['build:debug', 'watch']

  grunt.registerTask 'default', 'Default task', ['concurrent']
