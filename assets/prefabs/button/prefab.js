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
