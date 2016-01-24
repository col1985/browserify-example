module.exports = function (grunt) {

  // Load grunt tasks automatically
  // Load NPM tasks
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  // Time how long tasks take. Can help
  // when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    app: grunt.file.readJSON('cfg.json'),
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
        port: '<%= app.port %>',
        hostname: '<%= app.host %>',
        livereload: '<%= app.livereload %>'
      },
      livereload: {
        options: {
          open: {
            target: '<%= app.url %>'
          },
          base: [
            '.tmp',
            '<%= app.dist %>'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= app.dev %>/*.js',
          '<%= app.dev %>/js/*.js',
          '<%= app.dev %>/js/**/*.js',
          '!node_modules'
        ]
      }
    },

    browserify: {
      main: {
        options: {
          watch: true
        },
        src: ['<%= app.dev %>/**/*.js', '<%= app.dev %>/main.js'],
        dest: '<%= app.dist %>/bundle.js'
      }
    },

    less: {
      development: {
        files: {
          './<%= app.dev %>/main.css': './<%= app.dev %>/less/main.less'
        }
      }
    },

    watch: {
      js: {
        files: ['<%= app.dist %>/bundle.js'],
        tasks: ['jshint', 'browserify'],
        options: {
          livereload: 35730
        }
      },
      css: {
        files: ['<%= app.dev %>/less/**/*.less', '<%= app.dev %>/less/*.less'],
        tasks: ['less']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.app %>/{,*/}*.html',
          '.tmp/less/{,*/}*.css',
          '<%= app.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    dom_munger: {
      dev: {
        options: {
          read: [{
            selector: 'script[src]',
            attribute: 'src',
            writeto: 'jsFiles',
            isPath: true
          }, {
            selector: 'link',
            attribute: 'href',
            writeto: 'cssFiles',
            isPath: true
          }],
          remove: ['link', 'script'],
          append: [{
            selector: 'head',
            html: '<link href="bundle.css" rel="stylesheet">'
          }, {
            selector: 'body',
            html: '<script src="bundle.js"></script>'
          }]
        },
        src: './<%= app.dist %>/index.html',
        dest: './<%= app.dist %>/index.html'
      }
    },

    wiredep: {
      all: {
        src: [
          './<%= app.dist %>/index.html'
        ],
        dependencies: true,
        devDependencies: false
      }
    },

    cssmin: {
      // Combine our own CSS files for debug builds
      dev: {
        files: {
          '<%= app.dist %>/bundle.css': '<%= app.dev %>/main.css'
        }
      },
      dist: {
        files: {
          '<%= app.dist %>/bundle.min.css': '<%= dom_munger.data.cssFiles %>'
        }
      }
    },
  });

  grunt.registerTask('default', ['browserify', 'less', 'watch']);
  grunt.registerTask('format', ['jshint']);

  grunt.registerTask('develop', 'Starting dev watch server..', function (val) {
    grunt.config.set('connect.livereload.options.open', true);

    grunt.task.run([
      'connect:livereload',
      'browserify',
      'less',
      'cssmin:dev',
      'dom_munger:dev',
      'watch'
    ]);
  });



}
