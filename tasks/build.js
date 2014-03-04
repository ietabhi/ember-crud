module.exports = function(grunt) {
  grunt.registerTask('build', ['buildPackages', 'emberDefeatureify:stripDebug', 'uglify:dist']);
};
