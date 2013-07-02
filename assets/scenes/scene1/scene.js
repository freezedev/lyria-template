(function(scene) {

  scene.events = {
    '#btnSwitch': {
      'click': function(event) {
        event.data.scene.parent.show('scene2');
      }
    }
  };

  scene.expose({
    btnSwitchToNextScene: "Switch to next scene",
    test: "Hallo",
    title: scene.name
  });

})(this);
