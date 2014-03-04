var grunt = require('grunt');
module.exports = {
  options: {
    report: 'min',
    banner: grunt.file.read('generators/license.js'),
  },
  dist: {
    files: [{
     src: 'dist/ember-crud.prod.js',
     dest: 'dist/ember-crud.min.js',
    }]
  },
  report: {
    options:{
      report: 'gzip'
    },
    files: [{
     src: 'dist/ember-crud.prod.js',
     dest: 'dist/ember-crud.min.js',
    }]
  },
};
