module.exports = function(grunt) {
  
  var path = require('path');
  var fs = require('fs');

  var pkgFile = require('./package.json');

  var buildPrefix = 'builds';
  var buildId = pkgFile.name + '-v' + pkgFile.version + '-' + grunt.template.today("yymmdd-HHMMss");
  var buildFolder = path.join(buildPrefix, buildId) + path.sep;
  
  grunt.initConfig({
    pkg: pkgFile
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  var prepareScenes = require('./preparescenes');

  grunt.registerTask('prepare', 'Updates asset array and prepares scenes', function() {
    var done = this.async();
    var dir = './';
    var projectName = pkgFile.name;
    var assetObject = {};
    
    grunt.file.recurse(path.join(dir, 'assets'), function(abspath, rootdir, subdir, filename) {
      var stat;
      var dirname;
      
      if (subdir == null) {
        subdir = '';
      }
      
      if ((filename.toLowerCase().indexOf('readme') >= 0) || (subdir.indexOf('scenes') >= 0) || (subdir.indexOf('prefabs') >= 0) || (subdir.indexOf('gameobjects') >= 0)) {
        return;
      }
      
      if (!subdir) {
        dirname = 'root';
      } else {
        dirname = subdir;
      }
      
        assetObject[dirname] = assetObject[subdir] || {};
        stat = fs.statSync(abspath);
        assetObject[dirname].files = assetObject[dirname].files || [];
        assetObject[dirname].files.push({name: abspath, size: stat.size});
        if (assetObject[dirname].size) {
          assetObject[dirname].totalSize += stat.size;          
        } else {
          assetObject[dirname].totalSize = stat.size;
        }
    });
    
    var assetSize = 0;
    var value;
    for (var key in assetObject) {
      value = assetObject[key];
      
      assetSize += value.totalSize;
    }
    
    assetObject.totalSize = assetSize;

    grunt.file.write(path.join(dir, 'src', 'generated', 'assetlist.js'), 'define("' + projectName + '/assetlist",' + JSON.stringify(assetObject) + ');');

    prepareScenes(projectName, path.join(dir, 'assets', 'scenes'), path.join(dir, 'src', 'generated', 'scenelist.js'), function() {
      grunt.log.writeln('Project built');
      done();
    });
  });
  
  grunt.registerTask('default', 'Default task', ['build'])
  
};
