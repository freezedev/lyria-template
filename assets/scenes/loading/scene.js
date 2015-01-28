(function(scene) {

  scene.on('progress', function(percent) {
    $('#progress').html(~~(percent * 100));
  });

})(this);
