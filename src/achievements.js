define(['require'], function(require) {

  var Achievement = require('lyria/achievement');
  var AchievementManager = require('lyria/achievement/manager');

  return function(viewport, i18n) {
    
    AchievementManager.viewport = viewport;
    AchievementManager.localization = i18n;
    
    var achievement = new Achievement({
      name: 'switchScene'
    });
    
    AchievementManager.add(achievement);
    
  };
  
  
});
