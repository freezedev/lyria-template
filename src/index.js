define(['require'], function(require) {'use strict';

  // Loading all necessary modules
  var Game = require('lyria/game');
  var LocalizationGroup = require('lyria/localization/group');
  var achievements = require('mygame/achievements');
  var sceneList = require('mygame/scenelist');
  var prefabList = require('mygame/prefablist');
  var assetList = require('mygame/assetlist');
  var i18n = require('mygame/i18n');
  var PrefabManager = require('lyria/prefab/manager');

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
    // Add loading scene
    .addScene('loading')
    // Add "scene1"
    .addScene('scene1')
    // Add "scene2"
    .addScene('scene2');

  // Pass progress event through to the loading scene
  myGame.preloader.on('progress', function(percentage) {
    // TODO: Make sure this is always the loading scene
    if (myGame.director.currentScene && myGame.director.currentScene.name === 'loading') {
      myGame.director.currentScene.trigger(percentage);
    }
  });

  // If preloader is complete, everything in this function happens
  myGame.preloader.on('complete', function() {
    // Show "scene1"
    myGame.showScene('scene1');
  });

  // Set asset list for preloader
  myGame.preloader.assets = assetList;

  // Spin up the preloader
  myGame.preloader.start();

  // Set loading scene
  myGame.preloader.loadingScene = 'loading';

  return myGame;
}); 
