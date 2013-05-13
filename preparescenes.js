var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var UglifyJS = require('uglify-js');

var defaultSceneTemplate = "{{#if gameobject}}\n  {{#each gameobject}}\n    <div id=\"{{name}}\">{{{content}}}</div>\n  {{/each}}\n{{/if}}\n\n{{#if prefab}}\n  {{#each prefab}}\n    <div id=\"{{name}}\">{{{content}}}</div>\n  {{/each}}\n{{/if}}\n\n{{#if guilayer}}\n  {{{guilayer.content}}}\n{{/if}}";

module.exports = function(namespace, scenePath, output, callback) {
  
  var sceneObject = 'define("' + namespace + '/scenelist", ["lyria/scene", "lyria/template/engine"], function(Scene, TemplateEngine) {\n';
  sceneObject += '\tvar sceneList = {};\n';
  
  var sceneList = fs.readdirSync(scenePath);
  
  sceneList.forEach(function(scene) {
    
    if (path.extname(scene) === '') {
      if (fs.existsSync(path.join(scenePath, scene))) {
        
        sceneObject[scene] = {};
        
        sceneObject += '\tsceneList["' + scene + '"] = new Scene("' + scene + '", function(scene) {\n';
        
        var sceneFunc = path.join(scenePath, scene, 'scene.js');
        var sceneLoc = path.join(scenePath, scene, 'localization.json');
        var sceneMarkup = path.join(scenePath, scene, 'scene.html');
        
        if (fs.existsSync(sceneLoc)) {
          try {
            sceneObject += '\t\tthis.localization = ' + fs.readFileSync(sceneLoc) + ';\n';          
          } catch (e) {
            console.log('Error while evaluating ' + sceneLoc + ' :' + e);
          }
        }
        
        sceneObject += '\t\tthis.template = this.template || {};\n';
        
        if (fs.existsSync(sceneMarkup)) {
          sceneObject += '\t\tthis.template.source = TemplateEngine.compile(' + handlebars.precompile(fs.readFileSync(sceneMarkup, 'utf8') + '\n' + defaultSceneTemplate) + ');\n';
        } else {
          sceneObject += '\t\tthis.template.source = TemplateEngine.compile(' + handlebars.precompile(defaultSceneTemplate) + ');\n';
        }
        
        
        if (fs.existsSync(sceneFunc)) {
          sceneObject += '\t\tvar sceneFunc = ' + fs.readFileSync(sceneFunc, 'utf8') + ';\n';
          sceneObject += '\t\tif (typeof sceneFunc === "function") { sceneFunc = sceneFunc.apply(scene, [scene]); }';
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

