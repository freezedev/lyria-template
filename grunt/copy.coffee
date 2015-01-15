path = require 'path'

module.exports = (grunt) ->
  'use strict';

  assets:
    files: [{
      expand: true,
      cwd: 'assets',
      src: ['*/**'],
      dest: 'build/debug/assets',
      filter: (filepath) ->
        not ((filepath.indexOf(path.sep + 'scenes') >= 0) || (filepath.indexOf(path.sep + 'prefabs') >= 0))
    }]
  root:
    files: [{
      expand: true,
      src: ['favicon.ico', '*.png'],
      dest: 'build/debug/'
    }]
  production:
    files: [{
      expand: true
      cwd: 'build/debug/'
      src: ['*/**']
      dest: 'build/production/'
    }]
