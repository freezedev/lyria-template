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
* LESS (Lyria bundles uses LESS, but any other CSS preprocessor can be used as well)

Getting started:
`npm install`

Using the lyria template:
`grunt development`: Builds the current project
`grunt production`: Builds the current project, minifies everything and places it in the `builds` folder
`grunt deploy`: Does a production builds and makes a package out of it