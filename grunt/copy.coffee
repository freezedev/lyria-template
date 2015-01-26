path = require 'path'

module.exports = (grunt) ->
  'use strict';

  assets:
    files: [{
      expand: true,
      cwd: 'assets',
      src: ['*/**'],
      dest: '<%= buildDebug %>/assets',
      filter: (filepath) ->
        not ((filepath.indexOf(path.sep + 'scenes') >= 0) || (filepath.indexOf(path.sep + 'prefabs') >= 0))
    }]
  root:
    files: [{
      expand: true,
      src: ['favicon.ico', '*.png'],
      dest: '<%= buildDebug %>/'
    }]
  release:
    files: [{
      expand: true
      cwd: '<%= buildDebug %>/'
      src: ['*/**']
      dest: '<%= buildRelease %>/'
    }]
