module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  var createAssetArray = require('./createassetarray');
  var prepareScenes = require('./preparescenes');
  var path = require('path');

  grunt.registerTask('build', 'Updates asset array and prepares scenes', function() {
    var dir = './';
    
    createAssetArray(dir, function() {
      prepareScenes(path.join(dir, 'assets', 'scenes'), path.join(dir, 'src', 'scenes.js'), function() {
        grunt.log.writeln('Project built');
      });    
    });
  });
  
  grunt.registerTask('default', 'Default task', ['build'])
  
};
