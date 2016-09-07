module.exports = function (grunt) {
  'use strict';

  var config = require('config');
  var pkg = grunt.file.readJSON('package.json');
  for (var taskName in pkg.devDependencies) {
    if (taskName.indexOf('grunt-') > -1) {
      grunt.loadNpmTasks(taskName);
    }
  }

  var buildPaths = config.get('buildPaths');
  var portConfig = config.get('portConfig');

  grunt.initConfig({
    pkg: pkg,
    clean: {
      build: buildPaths.clean
    },
    copy: {
      build: {
        files: [
          // Copy plugin-assets to build location
          { expand: true, cwd: buildPaths.assetPath, src: ['**'], dest: buildPaths.buildLocation, filter: 'isFile' }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          sourcemap: 'none',
          style: 'expanded',
          trace: true,
          require: ['normalize-scss']
        },
        files: {
          './src/site/css/app.css': './src/sass/main.scss'
        }
      }
    },
    connect: {
      options: {
        hostname: '127.0.0.1'
      },
      dev: {
        options: {
          port: portConfig.dev,
          base: './src/site/',
          open: {
            target: 'http://127.0.0.1:<%= connect.dev.options.port %>/index.html'
          }
        }
      }
    },
    watch: {
      styles: {
        files: [
          'src/sass/**/*.scss'
        ],
        tasks: ['sass:dev']
      }
    }
  });

  grunt.registerTask('default', ['clean', 'sass', 'connect', 'watch']);

  grunt.registerTask('styles', ['sass', 'watch:styles']);

  grunt.registerTask('build', ['clean', 'copy', 'sass']);
}