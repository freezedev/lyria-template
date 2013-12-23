define('mygame', ['lyria/game', 'lyria/localization/group', 'mygame/achievements', 'mygame/scenelist', 'mygame/prefablist', 'mygame/assetlist', 'mygame/i18n', 'lyria/prefab/manager'], function(Game, LocalizationGroup, achievements, sceneList, prefabList, assetList, i18n, PrefabManager) {'use strict';

  // Create a new game object
  var myGame = new Game();

  myGame.localization = new LocalizationGroup(i18n);

  // Set up achievements
  achievements(myGame.viewport, myGame.localization.achievements);

  console.log(myGame);

  // Set generated scene files
  myGame.director.scenes = sceneList();

  // Set generated prefab files
  PrefabManager.prefabs = prefabList();
  
  // myGame allows to add scenes directly, which internally uses the scene director
  myGame
    // Add "scene1"
    .addScene('scene1')
    // Add "scene2"
    .addScene('scene2');

  // If preloader is complete, everything in this function happens
  myGame.preloader.on('complete', function() {
    // Show "scene1"
    myGame.showScene('scene1');
  });

  // Set asset list for preloader
  myGame.preloader.assets = assetList;

  // Spin up the preloader
  myGame.preloader.start();

  return myGame;
}); 