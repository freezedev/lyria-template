define('mygame/scenelist', ['lyria/scene', 'lyria/template/engine', 'lyria/localization'], function(Scene, TemplateEngine, Localization) {

  return function(param) {
    for (sceneKey in param) {
      var sceneValue = param[sceneKey];
      Scene.requireAlways[sceneKey] = sceneValue;
    }

    var sceneList = {};

    sceneList['scene1'] = new Scene('scene1', {}, function() {
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
          buffer += "\r\n";
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

    });

    sceneList['scene2'] = new Scene('scene2', {}, function() {
      var self = this;

      this.localization = new Localization({
        "en": {},
        "de": {}
      });
      this.template = this.template || {};
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
          buffer += "\r\n";
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

          scene.expose({
            test: 'Hallo'
          });

        })(this);

        //$ Lyria Scene end
      }).call(this);

    });

    return sceneList;
  };

});

/*
//@ sourceMappingURL=scenelist.js.map
*/