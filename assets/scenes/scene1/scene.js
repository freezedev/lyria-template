(function(scene, Lyria) {

  scene.on('test', function() {
    console.log('test');
  });

  /*scene.bindEvent({
   '#btnSwitch': {
   'click': function(event) {
   scene.trigger('test');
   scene.parent.show('scene2');
   }
   }
   });*/

  /*scene.DOMEvents = {
    '#btnSwitch': {
      'click': function(event) {
        scene.trigger('test');
        scene.parent.show('scene2');
      }
    }
  };*/

  scene.expose({
    test: "Hallo",
    title: scene.t('title', {
      name: scene.name
    })
  });

  console.log(scene);
  console.log(scene.game);
  scene.log('yeeha!');

})(this, arguments[1]);
