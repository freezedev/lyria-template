define('lyria-template/achievements', ['lyria/achievement', 'lyria/achievement/manager'], function(Achievement, AchievementManager) {
  
  return function(viewport, i18n) {
    
    AchievementManager.viewport = viewport;
    AchievementManager.localization = i18n;
    
    var achievement = new Achievement({
      name: 'switchScene'
    });
    
    AchievementManager.add(achievement);
    
  };
  
  
});

define("lyria-template/assetlist",{});
define("lyria-template/i18n", {"achievements":{"de":{"switchScene":"Szene gewechselt","switchScene-description":"Sie haben die Szene gewechselt."},"en":{"switchScene":"Switched scene","switchScene-description":"You switched the scene."}},"app":{"de":{"appName":"Lyria.js Template"},"en":{"appName":"Lyria.js Template"}}});
define('lyria-template/prefablist', ['lyria/scene', 'lyria/template/engine', 'lyria/localization'], function(Scene, TemplateEngine, Localization) {

  return function(param) {
    for (sceneKey in param) {
      var sceneValue = param[sceneKey];
      Scene.requireAlways[sceneKey] = sceneValue;
    }

    var sceneList = {};

    sceneList['button'] = function(param) {
      param = param || {};

      return new Scene('button', {}, function() {
        var self = this;

        this.localization = new Localization({
          "en": {
            "button": "You clicked the button.",
          },
          "de": {
            "button": "Du hast du den Button angeklickt.",
          }
        });
        this.template = this.template || {};
        this.template.data = {};
        this.template.partials = {};
        this.template.source = TemplateEngine.compile(function(Handlebars, depth0, helpers, partials, data) {
          this.compilerInfo = [4, '>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers);
          partials = this.merge(partials, Handlebars.partials);
          data = data || {};
          var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

          function program1(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = helpers.each.call(depth0, depth0.gameobject, {
              hash: {},
              inverse: self.noop,
              fn: self.program(2, program2, data),
              data: data
            });
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "\r\n";
            return buffer;
          }

          function program2(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n    <div id=\"";
            if (stack1 = helpers.name) {
              stack1 = stack1.call(depth0, {
                hash: {},
                data: data
              });
            } else {
              stack1 = depth0.name;
              stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\">";
            if (stack1 = helpers.content) {
              stack1 = stack1.call(depth0, {
                hash: {},
                data: data
              });
            } else {
              stack1 = depth0.content;
              stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "</div>\r\n  ";
            return buffer;
          }

          function program4(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = helpers.each.call(depth0, depth0.prefab, {
              hash: {},
              inverse: self.noop,
              fn: self.program(2, program2, data),
              data: data
            });
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "\r\n";
            return buffer;
          }

          function program6(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = self.invokePartial(partials.guilayer, 'guilayer', depth0, helpers, partials, data);
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "    \r\n";
            return buffer;
          }

          buffer += "<span class=\"button\">";
          if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
              hash: {},
              data: data
            });
          } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
          }
          buffer += escapeExpression(stack1) + "</span>";
          stack1 = helpers['if'].call(depth0, depth0.gameobject, {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
          });
          if (stack1 || stack1 === 0) {
            buffer += stack1;
          }
          stack1 = helpers['if'].call(depth0, depth0.prefab, {
            hash: {},
            inverse: self.noop,
            fn: self.program(4, program4, data),
            data: data
          });
          if (stack1 || stack1 === 0) {
            buffer += stack1;
          }
          stack1 = helpers['if'].call(depth0, depth0.guilayer, {
            hash: {},
            inverse: self.noop,
            fn: self.program(6, program6, data),
            data: data
          });
          if (stack1 || stack1 === 0) {
            buffer += stack1;
          }
          return buffer;
        }, {
          helpers: self.template.helpers,
          partials: self.template.partials
        });

        (function() {
          //$ Lyria Scene begin
          (function() {

            var self = this;

            // Get title from data if available
            var title = this.data.title;

            // Bind DOM events
            this.bindEvents({
              '.button': {
                'click': function(event) {
                  // Provide localized value
                  alert(self.t('button'));
                }
              }
            });

            // Expose title to the template
            this.expose({
              title: title || 'My button'
            });

          }).call(this);

          //$ Lyria Scene end
        }).call(this);

      }, {
        data: param
      });
    };

    return sceneList;
  };

});

/*
//@ sourceMappingURL=prefablist.js.map
*/
define('lyria-template/scenelist', ['lyria/scene', 'lyria/template/engine', 'lyria/localization'], function(Scene, TemplateEngine, Localization) {

  return function(param) {
    for (sceneKey in param) {
      var sceneValue = param[sceneKey];
      Scene.requireAlways[sceneKey] = sceneValue;
    }

    var sceneList = {};

    sceneList['scene1'] = function(param) {
      param = param || {};

      return new Scene('scene1', {}, function() {
        var self = this;

        this.localization = new Localization({
          "en": {
            "title": "This is {{name}}",
            "btnSwitchToNextScene": "Switch to next scene"
          },
          "de": {
            "title": "Das ist {{name}}",
            "btnSwitchToNextScene": "Zur nächsten Szene wechseln"
          }
        });
        this.template = this.template || {};
        this.template.data = {};
        this.template.partials = {};
        this.template.source = TemplateEngine.compile(function(Handlebars, depth0, helpers, partials, data) {
          this.compilerInfo = [4, '>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers);
          partials = this.merge(partials, Handlebars.partials);
          data = data || {};
          var buffer = "",
            stack1, stack2, options, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this,
            helperMissing = helpers.helperMissing;

          function program1(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = helpers.each.call(depth0, depth0.gameobject, {
              hash: {},
              inverse: self.noop,
              fn: self.program(2, program2, data),
              data: data
            });
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "\r\n";
            return buffer;
          }

          function program2(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n    <div id=\"";
            if (stack1 = helpers.name) {
              stack1 = stack1.call(depth0, {
                hash: {},
                data: data
              });
            } else {
              stack1 = depth0.name;
              stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\">";
            if (stack1 = helpers.content) {
              stack1 = stack1.call(depth0, {
                hash: {},
                data: data
              });
            } else {
              stack1 = depth0.content;
              stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "</div>\r\n  ";
            return buffer;
          }

          function program4(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = helpers.each.call(depth0, depth0.prefab, {
              hash: {},
              inverse: self.noop,
              fn: self.program(2, program2, data),
              data: data
            });
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "\r\n";
            return buffer;
          }

          function program6(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = self.invokePartial(partials.guilayer, 'guilayer', depth0, helpers, partials, data);
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "    \r\n";
            return buffer;
          }

          buffer += "<div>";
          if (stack1 = helpers.title) {
            stack1 = stack1.call(depth0, {
              hash: {},
              data: data
            });
          } else {
            stack1 = depth0.title;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
          }
          buffer += escapeExpression(stack1) + "</div>\r\n\r\n<span id=\"btnSwitch\" class=\"clickable\">";
          options = {
            hash: {},
            data: data
          };
          buffer += escapeExpression(((stack1 = helpers.translate || depth0.translate), stack1 ? stack1.call(depth0, "btnSwitchToNextScene", options) : helperMissing.call(depth0, "translate", "btnSwitchToNextScene", options))) + "</span>";
          stack2 = helpers['if'].call(depth0, depth0.gameobject, {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
          });
          if (stack2 || stack2 === 0) {
            buffer += stack2;
          }
          stack2 = helpers['if'].call(depth0, depth0.prefab, {
            hash: {},
            inverse: self.noop,
            fn: self.program(4, program4, data),
            data: data
          });
          if (stack2 || stack2 === 0) {
            buffer += stack2;
          }
          stack2 = helpers['if'].call(depth0, depth0.guilayer, {
            hash: {},
            inverse: self.noop,
            fn: self.program(6, program6, data),
            data: data
          });
          if (stack2 || stack2 === 0) {
            buffer += stack2;
          }
          return buffer;
        }, {
          helpers: self.template.helpers,
          partials: self.template.partials
        });

        (function() {
          //$ Lyria Scene begin
          (function(scene) {

            var Lyria = scene.modules.Lyria;

            scene.on('active', function() {
              console.log('active: ' + scene.name);
            });

            scene.on('achievement', function() {
              Lyria.AchievementManager.show('switchScene');
            });

            scene.bindEvents({
              '#btnSwitch': {
                'click': function(event) {
                  scene.trigger('achievement');
                  scene.parent.show('scene2');
                }
              }
            });

            scene.expose({
              test: "Hallo",
              title: scene.t('title', {
                name: scene.name
              })
            });

            console.log(scene);
            console.log(scene.game);
            scene.log('yeeha!');

          })(this);

          //$ Lyria Scene end
        }).call(this);

      }, {
        data: param
      });
    };

    sceneList['scene2'] = function(param) {
      param = param || {};

      return new Scene('scene2', {}, function() {
        var self = this;

        this.localization = new Localization({
          "en": {},
          "de": {}
        });
        this.template = this.template || {};
        this.template.data = {};
        this.template.partials = {};
        this.template.source = TemplateEngine.compile(function(Handlebars, depth0, helpers, partials, data) {
          this.compilerInfo = [4, '>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers);
          partials = this.merge(partials, Handlebars.partials);
          data = data || {};
          var buffer = "",
            stack1, functionType = "function",
            escapeExpression = this.escapeExpression,
            self = this;

          function program1(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = helpers.each.call(depth0, depth0.gameobject, {
              hash: {},
              inverse: self.noop,
              fn: self.program(2, program2, data),
              data: data
            });
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "\r\n";
            return buffer;
          }

          function program2(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n    <div id=\"";
            if (stack1 = helpers.name) {
              stack1 = stack1.call(depth0, {
                hash: {},
                data: data
              });
            } else {
              stack1 = depth0.name;
              stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "\">";
            if (stack1 = helpers.content) {
              stack1 = stack1.call(depth0, {
                hash: {},
                data: data
              });
            } else {
              stack1 = depth0.content;
              stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "</div>\r\n  ";
            return buffer;
          }

          function program4(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = helpers.each.call(depth0, depth0.prefab, {
              hash: {},
              inverse: self.noop,
              fn: self.program(2, program2, data),
              data: data
            });
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "\r\n";
            return buffer;
          }

          function program6(depth0, data) {

            var buffer = "",
              stack1;
            buffer += "\r\n  ";
            stack1 = self.invokePartial(partials.guilayer, 'guilayer', depth0, helpers, partials, data);
            if (stack1 || stack1 === 0) {
              buffer += stack1;
            }
            buffer += "    \r\n";
            return buffer;
          }

          buffer += "<div>";
          if (stack1 = helpers.test) {
            stack1 = stack1.call(depth0, {
              hash: {},
              data: data
            });
          } else {
            stack1 = depth0.test;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
          }
          buffer += escapeExpression(stack1) + "</div>";
          stack1 = helpers['if'].call(depth0, depth0.gameobject, {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
          });
          if (stack1 || stack1 === 0) {
            buffer += stack1;
          }
          stack1 = helpers['if'].call(depth0, depth0.prefab, {
            hash: {},
            inverse: self.noop,
            fn: self.program(4, program4, data),
            data: data
          });
          if (stack1 || stack1 === 0) {
            buffer += stack1;
          }
          stack1 = helpers['if'].call(depth0, depth0.guilayer, {
            hash: {},
            inverse: self.noop,
            fn: self.program(6, program6, data),
            data: data
          });
          if (stack1 || stack1 === 0) {
            buffer += stack1;
          }
          return buffer;
        }, {
          helpers: self.template.helpers,
          partials: self.template.partials
        });

        (function() {
          //$ Lyria Scene begin
          (function(scene) {

            var Lyria = scene.modules.Lyria;

            scene.on('active', function() {
              console.log('active: ' + scene.name);
            });

            scene.on('active', function() {
              Lyria.PrefabManager.append({
                name: 'button',
                parent: scene.$element
              });

              // It's funny when buttons appear out of thin air
              for (var i = 1, j = 3; i <= j; i++) {
                (function(index, time) {
                  scene.trigger({
                    name: 'more-buttons',
                    delay: time
                  }, i);
                })(i, i * 1500);
              }
            });

            scene.on('more-buttons', function(index) {
              Lyria.PrefabManager.append({
                name: 'button',
                parent: scene.$element
              }, {
                title: 'Button ' + index
              });
            });

            scene.expose({
              test: 'Hallo'
            });

          })(this);

          //$ Lyria Scene end
        }).call(this);

      }, {
        data: param
      });
    };

    return sceneList;
  };

});

/*
//@ sourceMappingURL=scenelist.js.map
*/
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