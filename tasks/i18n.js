var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('lyria_i18n', function() {
    var files = this.filesSrc;
    var options = this.options({
      namespace: 'mygame',
      name: 'i18n'
    });
    
    var content = {};
    
    for (var i = 0, j = files.length; i < j; i++) {
      (function(file) {
        var shortName = path.basename(file).split(path.extname(file))[0];
        
        content[shortName] = content[shortName] || {};
        content[shortName] = grunt.file.readJSON(file);
      })(files[i]);
    }
    
    var fileContent = 'define("' + options.namespace + '/' + options.name + '", ' + JSON.stringify(content) + ');';
    
    grunt.file.write('src/generated/i18n.js', fileContent);
  });
};
