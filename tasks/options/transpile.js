function nameFor(path) {
  var result,  match;
  if (match = path.match(/^(?:lib)\/(.*?)(?:\.js)?$/)) {
    result = match[1];
  } else {
    result = path;
  }
  return 'ember-crud/' + path;
}

module.exports = {
  amd: {
    type: 'amd',
    moduleName: nameFor,
    files: [{
      expand: true,
      cwd: 'lib/',
      src: [ '**/*.js', ],
      dest: 'tmp',
      ext: '.amd.js'
    }]
  }
};
