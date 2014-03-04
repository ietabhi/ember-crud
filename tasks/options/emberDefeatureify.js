module.exports = {
  options: {
    debugStatements: [
      "Ember.warn",
      "Ember.assert",
      "Ember.deprecate",
      "Ember.debug",
      "Ember.Logger.info"
    ]
  },
  stripDebug: {
    options: {
      enableStripDebug: true
    },
    src: 'dist/ember-crud.js',
    dest: 'dist/ember-crud.prod.js'
  }
};
