Lyria Project Template
======================
[![Build Status](https://travis-ci.org/freezedev/lyria-template.png?branch=master)](https://travis-ci.org/freezedev/lyria-template)
[![Dependency Status](https://david-dm.org/freezedev/lyria-template.png)](https://david-dm.org/freezedev/lyria-template)
[![devDependency Status](https://david-dm.org/freezedev/lyria-template/dev-status.png)](https://david-dm.org/freezedev/lyria-template#info=devDependencies)

Dependencies
------------

* Lyria and its dependencies:
  * Handlebars Runtime (default templating engine of Lyria)
  * Require.JS or any other AMD loader (Lyria uses with Almond.JS by default)
  * Detectr
  * Eventmap
  * Gameboard
* Modernizr (Optional, but included by default)

Features
--------

* Preparing assets (scenes and prefabs)
* Source map support for assets and JavaScript files

Developer dependencies
----------------------
* Grunt
* Handlebars
* Stylus (Lyria bundles Stylus, but any other CSS preprocessor can be used as well)

Getting started
---------------

Prerequisites:  
Node.js 0.10 or higher needs to be installed
  
Go ahead and download the latest template version.  
Navigate into the folder where extracted the template and run `npm install`.

Using the lyria template:
* `grunt`: Same as `grunt development`
* `grunt build:debug`: Builds the current project in debug mode
* `grunt build:release`: Builds the current project in release mode
* `grunt deploy`: Does a release build and deploys it on Github pages of the current repository


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/freezedev/lyria-template/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

