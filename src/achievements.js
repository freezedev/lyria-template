define('mygame/achievements', ['lyria/achievement', 'lyria/achievement/manager'], function(Achievement, AchievementManager) {
  
  return function(i18n) {
    
    AchievementManager.localization = i18n;
    
    var achievement = new Achievement({
      name: 'switchScene'
    });
    
    AchievementManager.add(achievement);
    
  };
  
  
});
