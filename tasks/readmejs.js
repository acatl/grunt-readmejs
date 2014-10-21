/*
 * readmejs
 *
 *
 * Copyright (c) 2014 Acatl Pacheco
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var path = require('path');
var task = require('./lib');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('readmejs', 'generate README.md from source code', function() {

    var modulePath = __dirname + '/templates/module.mustache';
    var templates = {
      module: grunt.file.read(modulePath)
    };

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      header: '',
      footer: '',
      showFilePath: false,
      compressed: false,
      quoteSummary: false
    });


    // Iterate over all specified file groups.
    this.files.forEach(function(file) {

      // Concat specified files.
      var src = file.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).

          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });

        var multiDemArr = task.getMultiDemensionalArray(src);
        var flatArr = task.reorderFilepaths(multiDemArr);

        src = flatArr.map(function(filepath) {
          var resource = new task.Resource(filepath, grunt.file.read(filepath));
          // Read file source.
          return resource;
        })
        .map(task.parseComments)
        .map(task.removeIgnored)
        .map(_.partial(task.transformContent, options))
        .map(_.partial(task.toMarkdown, templates))
        .join(grunt.util.normalizelf(''));

      var header = '';
      if (options.header) {
        header = grunt.file.read(options.header);
      }

      var footer = '';
      if (options.footer) {
        footer = grunt.file.read(options.footer);
      }

      src = header + src + footer;

      // Write the destination file.
      grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
