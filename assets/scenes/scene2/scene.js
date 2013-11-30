(function(scene) {

  var Lyria = scene.modules.Lyria;
  
  scene.on('active', function() {
    console.log('active: ' + scene.name);
  });

  scene.on('active', function() {
    Lyria.PrefabManager.append({
      name: 'button',
      parent: scene.$element
    });

    // It's funny when buttons appear out of thin air
    for (var i = 1, j = 3; i <= j; i++) {
      (function(index, time) {
        scene.trigger({
          name: 'more-buttons',
          delay: time
        }, i);
      })(i, i * 1500);
    }
  });

  scene.on('more-buttons', function(index) {
    Lyria.PrefabManager.append({
      name: 'button',
      parent: scene.$element
    }, {
      title: 'Button ' + index
    });
  });

  scene.expose({
    test: 'Hallo'
  });

})(this);
