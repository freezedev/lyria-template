module.exports =
  production:
    files:
      '<%= buildRelease %>/all.js': '<%= buildDebug %>/all.js'
