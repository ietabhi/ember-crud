module.exports = function(grunt) {
  grunt.registerTask('buildPackages', [
    'setVersionStamp',
    'clean',
    'jshint',
    'transpile:amd',
    'concat:globals'
  ]);
};
