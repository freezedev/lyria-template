/*define('mygame', 
  ['lyria/game', 'lyria/localization/group', 'mygame/achievements', 'mygame/scenelist', 'mygame/assetlist', 'mygame/i18n'], 
  function(Game, LocalizationGroup, achievements, sceneList, assetList, i18n) {
  'use strict';
  
  // Create a new game object
	var myGame = new Game();
	
	myGame.localization = new LocalizationGroup(i18n);
	
	// Set up achievements
	//achievements(myGame.localization.achievements);
	
	console.log(myGame);
	
	// Set generated scene files
	myGame.director.scenes = sceneList();
	
	// If preloader is complete, everything in this function happens
	myGame.preloader.on('complete', function() {
    // Add "scene1" to director
    myGame.director.add('scene1');
    // Add "scene2" to director
    myGame.director.add('scene2');

    console.log('All added');

    // Show "scene1"
    myGame.director.show('scene1');
    
    console.log('Shown'); 
  });
  
  // Set asset list for preloader
  myGame.preloader.assets = assetList;
  
  // Spin up the preloader
  myGame.preloader.start();
	
	return myGame;
});*/

define('mygame', 
  ['lyria/game', 'mygame/scenelist', 'mygame/assetlist'], 
  function(Game, sceneList, assetList) {
  'use strict';
  
  // Create a new game object
  var myGame = new Game();
  
  //myGame.localization = new LocalizationGroup(i18n);
  
  // Set up achievements
  //achievements(myGame.localization.achievements);
  
  console.log(myGame);
  
  // Set generated scene files
  myGame.director.scenes = sceneList;
  
  console.log(myGame.director.scenes);
  
  // If preloader is complete, everything in this function happens
  myGame.preloader.on('complete', function() {
    // Add "scene1" to director
    myGame.director.add('scene1');
    // Add "scene2" to director
    myGame.director.add('scene2');

    console.log('All added');

    // Show "scene1"
    myGame.director.show('scene1');
    
    console.log('Shown'); 
  });
  
  // Set asset list for preloader
  myGame.preloader.assets = assetList;
  
  // Spin up the preloader
  myGame.preloader.start();
  
  return myGame;
});