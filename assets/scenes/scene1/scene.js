(function(scene) {
  
  var Lyria = scene.modules.Lyria;

  scene.on('achievement', function() {
    Lyria.AchievementManager.show('switchScene');
  });
  
  scene.bindEvents({
    '#btnSwitch': {
      'click': function(event) {
        scene.trigger('achievement');
        scene.parent.show('scene2');
      }
    }
  });

  scene.expose({
    test: "Hallo",
    title: scene.t('title', {
      name: scene.name
    })
  });

  console.log(scene);
  console.log(scene.game);
  scene.log('yeeha!');

})(this);
