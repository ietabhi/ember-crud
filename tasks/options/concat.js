var grunt = require('grunt');

module.exports = {
  amd: {
    src: [ 'tmp/**/*.amd.js' ],
    dest: 'tmp/ember-crud.amd.js'
  },
  globals: {
    src: [ 'tmp/**/*.amd.js' ],
    dest: 'dist/ember-crud.js'
  }
};
