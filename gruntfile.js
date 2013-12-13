module.exports = function(grunt) {

  var fs = require('fs');
  require('es6-shim');
  var bower = require('bower');
  var path = require('path');

  var pkgFile = require('./package.json');
  var lyriaConfig = pkgFile.lyriaProject || {};

  var buildPrefix = 'builds';
  var buildVersion = pkgFile.version + '-' + grunt.template.today("yymmdd-HHMMss");
  var buildId = pkgFile.name + '-v' + buildVersion;
  buildId = grunt.option('build') || buildId;
  
  var buildFolder = [buildPrefix, buildId].join('/');

  var libFiles = (fs.existsSync('./lib')) ? fs.readdirSync('./lib') : [];
  var styleFiles = (fs.existsSync('./css')) ? fs.readdirSync('./css') : [];

  var libFilesPriorities = ['almond', 'handlebars', 'fastclick', 'udefine'];
  var skipLibs = ['mocha', 'chai'];

  var templateScripts = {
    development: [],
    production: []
  };
  var templateStyles = {
    development: [],
    production: []
  };

  var uglifyLibObject = {};
  var bowerStyleObject = {};

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

  uglifyLibObject[buildFolder + '/js/<%= pkg.name %>.js'] = '<%= concat_sourcemap.dist.dest %>';
  //templateScripts.push('js/<%= pkg.name %>.js');

  for (var k = 0, l = styleFiles.length; k < l; k++) {
    (function(iterator) {
      templateStyles.development.push('css/' + iterator);
      templateStyles.production.push('css/' + iterator);
    })(styleFiles[k]);
  }

  grunt.initConfig({
    pkg: pkgFile,
    lyriaConfig: lyriaConfig,
    buildVersion: buildVersion,
    buildFolder: buildFolder,
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
    clean: ['js', 'src/generated'],
    copy: {
      assets: {
        files: [{
          expand: true,
          src: ['assets/**'],
          dest: '<%= buildFolder %>/',
          filter: function(filepath) {
            if ((filepath.indexOf(path.sep + 'scenes') >= 0) || (filepath.indexOf(path.sep + 'prefabs') >= 0)) {
              return false;
            } else {
              return true;
            }
          }
        }]
      },
      root: {
        files: [{
          expand: true,
          src: ['css/**/*', 'favicon.ico', '*.png'],
          dest: '<%= buildFolder %>/'
        }]
      },
      styles: {
        files: [{
          expand: true,
          src: ['css/**/*'],
          dest: '<%= buildFolder %>/'
        }]
      },
      bowerStyles: {
        files: bowerStyleObject
      }
    },
    template: {
      development: {
        src: 'template.html',
        dest: 'index.html',
        engine: 'handlebars',
        variables: {
          livereload: true,
          scripts: templateScripts.development,
          styles: templateStyles.development,
          mainModule: pkgFile.name,
          title: '<%= lyriaConfig.title %> (Development build <%= buildVersion %>)',
          description: lyriaConfig.description,
          author: lyriaConfig.author
        }
      },
      production: {
        src: 'template.html',
        dest: '<%= buildFolder %>/index.html',
        engine: 'handlebars',
        variables: {
          livereload: false,
          scripts: templateScripts.production,
          styles: templateStyles.production,
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
      all: {
        options: {
          archive: '<%= buildFolder %>.zip'
        },
        files: [{
          cwd: '<%= buildFolder %>/',
          src: ['**'],
          dest: '<%= pkg.name %>/'
        }]
      }
    },
    stylus: {
      options: {
        paths: ['stylus', 'stylus/lyria'],
        urlfunc: 'embedurl',
        import: ['nib', 'asset'],
      },
      development: {
        options: {
          compress: false,
          linenos: true
        },
        files: {
          'css/<%= pkg.name %>.css': 'stylus/**/*.styl'
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          '<%= buildFolder %>/css/<%= pkg.name %>.css': 'stylus/**/*.styl'
        }
      }
    },
    csslint: {
      lint: {
        src: ['css/mygame.css']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      assets: {
        src: ['assets/**/*.js']
      },
      source: {
        src: ['src/**/*.js', '!src/generated/**/*.js']
      },
      gruntfile: {
        src: ['gruntfile.js']
      }
    },
    connect: {
      built: {
        options: {
          keepalive: true,
          base: '<%= buildFolder %>/',
          port: 9000
        }
      }
    },
    watch: {
      options: {
        // Start a live reload server on the default port 35729
        livereload: true,
      },
      stylus: {
        files: 'stylus/**/*.styl',
        tasks: ['stylus:development']
      },
      assetList: {
        files: 'assets/**/*',
        tasks: ['lyriaAssetList']
      },
      scenes: {
        files: 'assets/scenes/*',
        tasks: ['lyriaScene']
      },
      i18nData: {
        files: 'assets/i18n/**/*.json',
        tasks: ['lyriaData']
      },
      template: {
        files: 'template.html',
        tasks: ['bower']
      },
      concat: {
        files: 'src/**/*.js',
        tasks: ['concat_sourcemap']
      }
    },
    lyriaData: {
      options: {
        namespace: '<%= pkg.name %>'
      },
      all: {
        options: {
          name: 'i18n'
        },
        dest: 'src/generated/i18n.js',
        src: ['assets/i18n/**/*.json']
      }
    },
    lyriaAssetList: {
      options: {
        namespace: '<%= pkg.name %>'
      },
      all: {
        dest: 'src/generated/assetlist.js',
        src: ['assets/**/*', '!**/README.md'],
        filter: 'isFile'
      }
    },
    lyriaScene: {
      options: {
        namespace: '<%= pkg.name %>'
      },
      scenes: {
        files: [{
          dest: 'src/generated/scenelist.js',
          src: ['assets/scenes/*'],
          filter: 'isDirectory'
        }]
      },
      prefabs: {
        options: {
          name: 'prefablist',
          entryFile: 'prefab.js',
          markupFile: 'prefab.html'
        },
        files: [{
          dest: 'src/generated/prefablist.js',
          src: ['assets/prefabs/*'],
          filter: 'isDirectory'
        }]
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var bowerList = function(done) {
    bower.commands.list({
      paths: true
    }).on('end', function(results) {
      var prepareBowerAsset = function(value) {
        value = path.relative(process.cwd(), value);

        // All forward slashes, please
        value = value.split('\\').join('/');

        if (!value.endsWith('.css')) {

          if (!value.endsWith('.js')) {
            value += '/' + key + '.js';
          }

          var libFile = ['lib', path.basename(value)].join('/');
          var buildLibFile = [buildFolder, libFile].join('/');
          uglifyLibObject[buildLibFile] = value;

          if (libFilesPriorities.indexOf(key) >= 0) {
            templateScripts.development.unshift(value);
            templateScripts.production.unshift(libFile);
          } else {
            templateScripts.development.push(value);
            templateScripts.production.push(libFile);
          }

        } else {
          var styleFile = ['css', path.basename(value)].join('/');
          bowerStyleObject[[buildFolder, styleFile].join('/')] = value;
          
          templateStyles.development.unshift(value);
          templateStyles.production.unshift(styleFile);
        }
      };

      for (var key in results) {
        if (skipLibs.indexOf(key) >= 0) {
          continue;
        }
        
        var val = results[key];

        if (val.indexOf(',') >= 0) {
          val = val.split(',');
        }

        if (Array.isArray(val)) {
          // TODO: Handlebars doesn't need special treatment right now, but will once we use the AMD version
          //if (key === 'handlebars') {
          //  prepareBowerAsset(val[1]);
          //} else {
            for (var i = 0, j = val.length; i < j; i++) {
              if (((path.extname(val[i]) === '.js') && !val[i].endsWith('.min.js')) || path.extname(val[i]) === '.css') {
                prepareBowerAsset(val[i]);
              }
            }
          //}

        } else {
          prepareBowerAsset(val);
        }
      }

      templateScripts.development.push('js/<%= pkg.name %>.js');
      templateScripts.production.push('js/<%= pkg.name %>.js');

      done();
    });
  };

  grunt.registerTask('bower:development', 'Prepares scripts using bower components', function() {
    var done = this.async();

    bowerList(function() {
      grunt.task.run('template:development');
      done();
    });
  });

  grunt.registerTask('bower:production', 'Prepares scripts using bower components', function() {
    var done = this.async();

    bowerList(function() {
      grunt.task.run('template:production');
      done();
    });
  });

  grunt.registerTask('prebuild', 'Task before building the project', ['lyriaScene', 'lyriaAssetList', 'lyriaData', 'concat_sourcemap']);
  grunt.registerTask('test', 'Lints JavaScript and CSS files', ['jshint']);

  grunt.registerTask('development', 'Development build', ['test', 'clean', 'prebuild', 'bower:development', 'stylus:development']);
  grunt.registerTask('production', 'Production build', ['test', 'clean', 'prebuild', 'bower:production', 'uglify', 'copy', 'stylus:production']);
  grunt.registerTask('pack', 'Packs project', ['production', 'compress']);
  grunt.registerTask('deploy', 'Builds project in production mode and starts a local server', ['production', 'connect']);

  grunt.registerTask('build', 'Builds the default project', ['development']);
  grunt.registerTask('default', 'Default task', ['development']);

  // The future in order
  grunt.registerTask('observe', 'Default task', ['development', 'watch']);

};
