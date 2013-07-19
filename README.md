Lyria Project Template
======================

Dependencies
------------

* Handlebars Runtime (default templating engine of Lyria)
* Require.JS or any other AMD loader (Lyria uses with Almond.JS by default)
* Modernizr (Optional, but included by default)
* Detectr
* checkt

Developer dependencies
----------------------
* Grunt
* Handlebars
* LESS (Lyria bundles LESS, but any other CSS preprocessor can be used as well)

Getting started
---------------

Prerequisites:  
Node.js 0.10 or higher needs to be installed
  
Go ahead and download the latest template version.  
Navigate into the folder where extracted the template and run `npm install`.

Using the lyria template:
* `grunt development`: Builds the current project
* `grunt production`: Builds the current project, minifies everything and places it in the `builds` folder
* `grunt deploy`: Does a production builds and makes a package out of it