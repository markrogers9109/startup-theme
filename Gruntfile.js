module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({
//  Copy
    copy: {
      dist: { cwd: 'font', src: [ '**' ], dest: 'dist/font', expand: true },
    },


//  Sass
    sass: {                              // Task
      expanded: {                            // Target
        options: {                       // Target options
          outputStyle: 'expanded',
          sourcemap: false,
        },
        files: {
          'css/startup-materialize.css': 'sass/startup.scss',
          'css/startup-standalone.css': 'sass/startup-standalone.scss',
        }
      },

      min: {
        options: {
          outputStyle: 'compressed',
          sourcemap: false
        },
        files: {
          'css/startup-materialize.min.css': 'sass/startup.scss',
          'css/startup-standalone.min.css': 'sass/startup-standalone.scss',
        }
      },
    },

    // PostCss Autoprefixer
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
                'last 2 versions',
                'Chrome >= 30',
                'Firefox >= 30',
                'ie >= 10',
                'Safari >= 8']
          })
        ]
      },
      expanded: {
        src: 'css/startup-materialize.css'
      },
      min: {
        src: ['css/materialize.min.css', 'css/startup-materialize.min.css']
      },
    },

  // Browser Sync integration
    browserSync: {
      bsFiles: ["bin/*.js", "bin/*.css", "!**/node_modules/**/*"],
      options: {
          server: {
              baseDir: "./" // make server from root dir
          },
          port: 8000,
          ui: {
              port: 8080,
              weinre: {
                  port: 9090
              }
          },
          open: false
      }
    },

//  Concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
              "materialize/js/initial.js",
              "materialize/js/jquery.easing.1.3.js",
              "materialize/js/animation.js",
              "materialize/js/velocity.min.js",
              "materialize/js/hammer.min.js",
              "materialize/js/jquery.hammer.js",
              "materialize/js/global.js",
              "materialize/js/collapsible.js",
              "materialize/js/dropdown.js",
              "materialize/js/leanModal.js",
              "materialize/js/materialbox.js",
              "materialize/js/parallax.js",
              "materialize/js/tabs.js",
              "materialize/js/tooltip.js",
              "materialize/js/waves.js",
              "materialize/js/toasts.js",
              "materialize/js/sideNav.js",
              "materialize/js/scrollspy.js",
              "materialize/js/forms.js",
              "materialize/js/slider.js",
              "materialize/js/cards.js",
              "materialize/js/chips.js",
              "materialize/js/pushpin.js",
              "materialize/js/buttons.js",
              "materialize/js/transitions.js",
              "materialize/js/scrollFire.js",
              "materialize/js/date_picker/picker.js",
              "materialize/js/date_picker/picker.date.js",
              "materialize/js/character_counter.js",
              "materialize/js/carousel.js",
             ],
        // the location of the resulting JS file
        dest: 'js/materialize.js'
      },
      temp: {
        // the files to concatenate
        src: [
              "materialize/js/initial.js",
              "materialize/js/jquery.easing.1.3.js",
              "materialize/js/animation.js",
              "materialize/js/velocity.min.js",
              "materialize/js/hammer.min.js",
              "materialize/js/jquery.hammer.js",
              "materialize/js/global.js",
              "materialize/js/collapsible.js",
              "materialize/js/dropdown.js",
              "materialize/js/leanModal.js",
              "materialize/js/materialbox.js",
              "materialize/js/parallax.js",
              "materialize/js/tabs.js",
              "materialize/js/tooltip.js",
              "materialize/js/waves.js",
              "materialize/js/toasts.js",
              "materialize/js/sideNav.js",
              "materialize/js/scrollspy.js",
              "materialize/js/forms.js",
              "materialize/js/slider.js",
              "materialize/js/cards.js",
              "materialize/js/chips.js",
              "materialize/js/pushpin.js",
              "materialize/js/buttons.js",
              "materialize/js/transitions.js",
              "materialize/js/scrollFire.js",
              "materialize/js/date_picker/picker.js",
              "materialize/js/date_picker/picker.date.js",
              "materialize/js/character_counter.js",
              "materialize/js/carousel.js",
             ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      },
    },

//  Uglify
    uglify: {
      options: {
        // Use these options when debugging
        // mangle: false,
        // compress: false,
        // beautify: true

      },
      dist: {
        files: {
          'js/materialize.js': ['js/materialize.js']
        }
      },
      bin: {
        files: {
          'bin/materialize.js': ['temp/js/materialize.js']
        }
      },
      extras: {
        files: {
          'extras/noUiSlider/nouislider.min.js': ['extras/noUiSlider/nouislider.js']
        }
      }
    },


//  Clean
   clean: {
     temp: {
       src: [ 'temp/' ]
     },
   },

//  Watch Files
    watch: {
      js: {
        files: [ "js/**/*", "!js/init.js"],
        tasks: ['js_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      },

      sass: {
        files: ['sass/**/*'],
        tasks: ['sass_compile'],
        options: {
          interrupt: false,
          spawn: false,
        },
      }
    },


//  Concurrent
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10,
      },
      monitor: {
        tasks: ["watch:js", "watch:sass", "notify:watching", 'server']
      },
    },


//  Notifications
    notify: {
      watching: {
        options: {
          enabled: true,
          message: 'Watching Files!',
          title: "Materialize", // defaults to the name in package.json, or will use project directory's name
          success: true, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      sass_compile: {
        options: {
          enabled: true,
          message: 'Sass Compiled!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      },

      js_compile: {
        options: {
          enabled: true,
          message: 'JS Compiled!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      },

      jade_compile: {
        options: {
          enabled: true,
          message: 'Jade Compiled!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      },

      server: {
        options: {
          enabled: true,
          message: 'Server Running!',
          title: "Materialize",
          success: true,
          duration: 1
        }
      }
    },

      // Removes console logs
      removelogging: {
          source: {
            src: ["js/**/*.js", "!js/velocity.min.js"],
            options: {
              // see below for options. this is optional.
            }
          }
      },
  });

  // load the tasks
  // grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-postcss');
  // define the tasks
  grunt.registerTask(
    'release',[
      'lint',
      'copy',
      'sass:expanded',
      'sass:min',
      'postcss:expanded',
      'postcss:min',
      'concat:dist',
      'uglify:dist',
      'uglify:extras',
      // 'usebanner:release',
      // 'compress:main',
      // 'compress:src',
      // 'compress:starter_template',
      // 'compress:parallax_template',
      // 'replace:version',
      // 'replace:readme',
      // 'rename:rename_src',
      // 'rename:rename_compiled'
    ]
  );

  grunt.registerTask('js_compile', ['concat:temp', 'uglify:bin', 'notify:js_compile', 'clean:temp']);
  grunt.registerTask('sass_compile', ['sass:min', 'sass:expanded', 'postcss:min', 'postcss:expanded', 'notify:sass_compile']);
  grunt.registerTask('server', ['browserSync', 'notify:server']);
  grunt.registerTask('lint', ['removelogging:source']);
  grunt.registerTask('monitor', ["concurrent:monitor"]);
};
