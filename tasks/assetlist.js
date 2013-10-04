var fs = require('fs');
var mime = require('mime');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('lyria_assetList', function() {
    var files = this.filesSrc;
    var options = this.options({
      namespace: 'mygame',
      name: 'assetlist',
      ignores: ['scenes', 'i18n', 'prefabs', 'gameobjects', 'prefabs']
    });
    
    var assetObject = {};
    var assetSize = 0;

    for (var i = 0, j = files.length; i < j; i++) {
      (function(file) {
        var dirname = (file.split('/')[1].indexOf('.') > 0) ? 'root' : file.split('/')[1];
        
        if (options.ignores.indexOf(dirname) >= 0) {
          return;
        }

        assetObject[dirname] = assetObject[dirname] || {};
        stat = fs.statSync(file);
        assetObject[dirname].files = assetObject[dirname].files || [];
        assetObject[dirname].files.push({
          name: file,
          type: mime.lookup(file),
          size: stat.size
        });
        
        if (assetObject[dirname].totalSize) {
          assetObject[dirname].totalSize += stat.size;
        } else {
          assetObject[dirname].totalSize = stat.size;
        }

      })(files[i]);
    }
    
    var value;
    for (var key in assetObject) {
      value = assetObject[key];

      assetSize += value.totalSize;
    }

    if (assetSize) {
      assetObject.totalSize = assetSize;      
    }
    
    
    grunt.file.write(path.join('src', 'generated', 'assetlist.js'), 'define("' + options.namespace + '/' + options.name + '",' + JSON.stringify(assetObject) + ');');
  });
};
