define(['lyria/achievement', 'lyria/achievement/manager'], function(Achievement, AchievementManager) {
  
  return function(viewport, i18n) {
    
    AchievementManager.viewport = viewport;
    AchievementManager.localization = i18n;
    
    var achievement = new Achievement({
      name: 'switchScene'
    });
    
    AchievementManager.add(achievement);
    
  };
  
  
});
