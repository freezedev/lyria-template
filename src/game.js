define('mygame', 
  ['lyria/game', 'lyria/localization/group', 'mygame/achievements', 'mygame/scenelist', 'mygame/prefablist', 'mygame/assetlist', 'mygame/i18n', 'lyria/prefab/manager'], 
  function(Game, LocalizationGroup, achievements, sceneList, prefabList, assetList, i18n, PrefabManager) {
  'use strict';
  
  // Create a new game object
	var myGame = new Game();
	
	myGame.localization = new LocalizationGroup(i18n);
	
	// Set up achievements
	achievements(myGame.viewport, myGame.localization.achievements);
	
	console.log(myGame);
	
	// Set generated scene files
	myGame.director.scenes = sceneList({
	  'lyria/prefab/manager': 'Lyria.PrefabManager'
	});
	
	// Set generated prefab files
	PrefabManager.prefabs = prefabList();
	
	// If preloader is complete, everything in this function happens
	myGame.preloader.on('complete', function() {
    // Add "scene1" to director
    myGame.director.add('scene1');
    // Add "scene2" to director
    myGame.director.add('scene2');

    // Show "scene1"
    myGame.director.show('scene1');
  });
  
  // Set asset list for preloader
  myGame.preloader.assets = assetList;
  
  // Spin up the preloader
  myGame.preloader.start();
	
	return myGame;
});