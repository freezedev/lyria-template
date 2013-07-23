var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var UglifyJS = require('uglify-js');

// Using esprima might be overkill, but maybe I could use it for other stuff?
var esprima = require('esprima');

// TODO: Add sourcemaps
// TODO: Make this available for prefabs as well

var defaultSceneTemplate = "{{#if gameobject}}\n  {{#each gameobject}}\n    <div id=\"{{name}}\">{{{content}}}</div>\n  {{/each}}\n{{/if}}\n\n{{#if prefab}}\n  {{#each prefab}}\n    <div id=\"{{name}}\">{{{content}}}</div>\n  {{/each}}\n{{/if}}\n\n{{#if guilayer}}\n  {{{guilayer.content}}}\n{{/if}}";

module.exports = function(namespace, scenePath, output, callback) {
  
  var sceneObject = 'define("' + namespace + '/scenelist", ["lyria/scene", "lyria/template/engine"], function(Scene, TemplateEngine) {\n';
  sceneObject += '\tvar sceneList = {};\n';
  
  var sceneList = fs.readdirSync(scenePath);
  
  sceneList.forEach(function(scene) {
    
    if (path.extname(scene) === '') {
      if (fs.existsSync(path.join(scenePath, scene))) {
        
        var sceneFunc = path.join(scenePath, scene, 'scene.js');
        var sceneFuncContent = fs.existsSync(sceneFunc) ? fs.readFileSync(sceneFunc, 'utf8') : null;
        var sceneLoc = path.join(scenePath, scene, 'localization.json');
        var sceneMarkup = path.join(scenePath, scene, 'scene.html');
        var scenePartials = path.join(scenePath, scene, 'partials');
        
        var parsedSceneFunc = {};
        
        var sceneDeps = '[]';
        var options = '{}';
        
        
        if (sceneFuncContent != null) {
          parsedSceneFunc = esprima.parse(sceneFuncContent, {comment: true});
          
          var commentArray = parsedSceneFunc.comments;
          
          if (commentArray != null && Array.isArray(commentArray) && commentArray.length > 0) {
            
            for (var i = 0, j = commentArray.length; i < j; i++) {
              
              (function(comment) {
                if ((comment.type == null && comment.value == null) || comment.type !== 'Block') {
                  return;
                }
                
                var value = comment.value;
                
                if (value.indexOf(':') > 0) {
                  var splitted = value.split(':');
            
                  var name = splitted[0];
                  var data = splitted[1];
                  
                  switch(name) {
                    case 'depends':
                      sceneDeps = data;
                      break;
                      
                    case 'options':
                      options = data;
                    
                    default:
                      break;
                  }
                }
              })(commentArray[i]);
            }          
          }
        }
        
        
        sceneObject[scene] = {};
        
        sceneObject += '\tsceneList["' + scene + '"] = new Scene("' + scene + '", ' + sceneDeps + ', function() {\n';
        
        if (fs.existsSync(sceneLoc)) {
          try {
            sceneObject += '\t\tthis.localization = ' + fs.readFileSync(sceneLoc) + ';\n';          
          } catch (e) {
            console.log('Error while evaluating ' + sceneLoc + ' :' + e);
          }
        }
        
        if (fs.existsSync(scenePartials)) {
          var partialsList = fs.readdirSync(scenePartials);
          
          partialsList.forEach(function(partial) {
            
          });
        }
        
        sceneObject += '\t\tthis.template = this.template || {};\n';
        
        if (fs.existsSync(sceneMarkup)) {
          sceneObject += '\t\tthis.template.source = TemplateEngine.compile(' + handlebars.precompile(fs.readFileSync(sceneMarkup, 'utf8') + '\n' + defaultSceneTemplate) + ');\n';
        } else {
          sceneObject += '\t\tthis.template.source = TemplateEngine.compile(' + handlebars.precompile(defaultSceneTemplate) + ');\n';
        }
        
        
        if (sceneFuncContent != null) {
          sceneObject += '\t\tvar sceneFunc = ' + sceneFuncContent + ';\n';
          sceneObject += '\t\tif (typeof sceneFunc === "function") { sceneFunc = sceneFunc.apply(this, arguments); }';
          sceneObject += '\t\treturn sceneFunc;';
        }
        
        
        sceneObject += '\t});\n';
      }
    }
    
  });
  
  sceneObject += '\treturn sceneList;\n';
  
  sceneObject += '});';
  
  fs.writeFile(output, sceneObject, 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
    
    if (callback) {
      callback();      
    }
  });
};