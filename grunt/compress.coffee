module.exports =
  all:
    options:
      archive: '<%= buildFolder %>.zip'
    files: [{
      cwd: '<%= buildFolder %>/',
      src: ['**'],
      dest: '<%= package.name %>/'
    }]