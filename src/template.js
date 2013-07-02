define('mygame', ['lyria/game', 'mygame/scenelist', 'mygame/assetlist'], function(Game, sceneList, assetList) {
  'use strict';
  
	var myGame = new Game();
	
	myGame.director.precompiledScenes = sceneList;
	
	myGame.preloader.on('complete', function() {
    myGame.director.add('scene1');
    myGame.director.add('scene2');

    myGame.director.show('scene1'); 
  });
  
  myGame.preloader.assets = assetList;
  myGame.preloader.start();
	
	
});