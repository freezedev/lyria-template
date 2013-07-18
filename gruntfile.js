module.exports = function(grunt) {

  var path = require('path');
  var fs = require('fs');

  var pkgFile = require('./package.json');
  var lyriaConfig = pkgFile.lyriaProject || {};

  var buildPrefix = 'builds';
  var buildVersion = pkgFile.version + '-' + grunt.template.today("yymmdd-HHMMss");
  var buildId = pkgFile.name + '-v' + buildVersion;
  var buildFolder = path.join(buildPrefix, buildId) + path.sep;

  var libFiles = fs.readdirSync('./lib');
  var styleFiles = fs.readdirSync('./css');

  var libFilesPriorities = ['almond.js', 'handlebars.runtime.js', 'fastclick.js'];

  var templateScripts = [];
  var templateStyles = [];

  var uglifyLibObject = {};

  for (var i = 0, j = libFiles.length; i < j; i++) {
    (function(iterator) {
      uglifyLibObject[path.join(buildFolder, 'lib', iterator)] = path.join('./lib', iterator);
      if (libFilesPriorities.indexOf(iterator) >= 0) {
        templateScripts.unshift('lib/' + iterator);
      } else {
        templateScripts.push('lib/' + iterator);
      }
    })(libFiles[i]);
  }

  uglifyLibObject[buildFolder + '/js/<%= pkg.name %>.js'] = '<%= concat.dist.dest %>';
  templateScripts.push('js/<%= pkg.name %>.js');

  for (var k = 0, l = styleFiles.length; k < l; k++) {
    (function(iterator) {
      templateStyles.push('css/' + iterator);
    })(styleFiles[k]);
  }

  grunt.initConfig({
    pkg: pkgFile,
    lyriaConfig: lyriaConfig,
    buildVersion: buildVersion,
    concat_sourcemap: {
      options: {
        sourcesContent: true,
        sourceRoot: '/'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    copy: {
      production: {
        files: [{
          expand: true,
          src: ['assets/**'],
          dest: buildFolder,
          filter: function(filepath) {
            if ((filepath.indexOf(path.sep + 'scenes') >= 0) || (filepath.indexOf(path.sep + 'prefabs') >= 0)) {
              return false;
            } else {
              return true;
            }
          }
        }, {
          expand: true,
          src: ['css/**'],
          dest: buildFolder
        }, {
          expand: true,
          src: ['favicon.ico'],
          dest: buildFolder
        }, {
          expand: true,
          src: ['*.png'],
          dest: buildFolder
        }]
      }
    },
    template: {
      development: {
        src: 'template.html',
        dest: 'index.html',
        engine: 'handlebars',
        variables: {
          scripts: templateScripts,
          styles: templateStyles,
          mainModule: pkgFile.name,
          title: '<%= lyriaConfig.title %> (Development build <%= buildVersion %>)',
          description: lyriaConfig.description,
          author: lyriaConfig.author
        }
      },
      production: {
        src: 'template.html',
        dest: '<%= buildFolder %>index.html',
        engine: 'handlebars',
        variables: {
          scripts: templateScripts,
          styles: templateStyles,
          mainModule: pkgFile.name,
          title: lyriaConfig.title,
          description: lyriaConfig.description,
          author: lyriaConfig.author
        }
      }
    },
    uglify: {
      production: {
        files: uglifyLibObject
      }
    },
    compress: {
      deploy: {
        options: {
          archive: path.join(buildPrefix, buildId) + '.zip'
        },
        files: [{
          cwd: buildFolder,
          src: ['**'],
          dest: '<%= pkg.name %>/'
        }]
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['stylus'],
          urlfunc: 'embedurl',
          import: ['nib'],
          compress: false,
          linenos: true
        },
        files: {
          'css/<%= pkg.name %>.css': 'stylus/**/*.styl'
        }
      }
    },
    csslint: {
      lint: {
        src: ['css/mygame.css']
      }
    },
    watch: {
      stylus: {
        files: 'stylus/**/*.styl',
        tasks: ['stylus']
      },
      prepare: {
        files: 'assets/**/*',
        tasks: ['prepare']
      },
      template: {
        files: 'template.html',
        tasks: ['template:development']
      },
      concat: {
        files: 'src/**/*.js',
        tasks: ['concat_sourcemap']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-templater');

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
      assetObject[dirname].files.push({
        name: abspath,
        size: stat.size
      });
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

  grunt.registerTask('prebuild', 'Task before building the project', ['prepare', 'concat_sourcemap', 'stylus']);
  grunt.registerTask('lint', 'Lints JavaScript and CSS files', ['csslint']);

  grunt.registerTask('development', 'Development build', ['prebuild', 'template:development']);
  grunt.registerTask('production', 'Production build', ['prebuild', 'uglify', 'copy', 'template:production']);
  grunt.registerTask('deploy', 'Deploys project', ['production', 'compress:deploy']);

  grunt.registerTask('build', 'Builds the default project', ['development']);
  grunt.registerTask('default', 'Default task', ['development']);

};
