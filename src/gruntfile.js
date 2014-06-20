module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /* BANNER --------------------------------------------------------------- */

    banner: {

      'short': '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n'
    },

    /* WATCH ---------------------------------------------------------------- */

    /**
     * Run predefined tasks whenever watched file patterns are added, changed
     * or deleted.
     *
     * @see https://github.com/gruntjs/grunt-contrib-watch
     */

     watch: {
      options: { livereload: true },
      files: [
        './files/js/**/*',
        './files/scss/**/*',
        './files/templates/**/*',
      ],

      tasks: ['default']
     },

    /* VERSIONING ----------------------------------------------------------- */

    /**
     * Build date and version.
     *
     * @see http://tanepiper.com/blog/2012/11/25/building-and-testing-javascript-with-gruntjs/
     * @see http://blog.stevenlevithan.com/archives/date-time-format
     */

    now: grunt.template.today('yyyymmdd'),
    version: 1, // Increment if more than one build is needed in a single day.

    /* ENV ------------------------------------------------------------------ */

    /**
     * Grunt task to automate environment configuration for future tasks.
     *
     * @see https://github.com/onehealth/grunt-env
     */

    env: {
      dev: { NODE_ENV: 'DEVELOPMENT' },
      prod: { NODE_ENV: 'PRODUCTION' }
    },

  /* CLEAN ------------------------------------------------------------------ */

  /**
   * Clean files and folders.
   *
   * @see https://github.com/gruntjs/grunt-contrib-clean
   */

  clean: {

    options: {
      force: true, // Allows for deletion of folders outside current working dir (CWD). Use with caution.
    },

    dev: [
      '../dev/**/*',
    ],

    prod: [
      // '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/**/*',
      '../prod/**/*',
    ]
  },

  /* UGLIFY ----------------------------------------------------------------- */

  uglify: {

    prod: {
      options: {
        banner: '<%= banner.short %>',
      },

      files: {
         // '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/js/index.js': [
        '../prod/js/scripts.min.js': [
        './files/js/vendor/*',
        './files/js/scripts.js'
        ],
      },
    }
  },

  /* SASS ------------------------------------------------------------------- */

  /**
   * Compile Sass to CSS.
   *
   * @see https://github.com/gruntjs/grunt-contrib-sass
   * @see http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#output_style
   */

  /*
  sass: {

    options: {
      precision: 14, // How many digits of precision to use when outputting decimal numbers.
      noCache: true, // Don't cache to sassc files.
    },

    dev: {
      options: {
        banner: '<%= banner.short %>',
        style: 'expanded',
      },
      files: {
        '../dev/css/screen.css':'./files/scss/screen.scss'
      },
      tasks: [
        'compass:dev'
      ]
    },

    prod: {
      options: {
        banner: '<%= banner.short %>',
        style: 'compressed',
      },
      files: {
        '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/css/screen.css':'./files/scss/screen.scss'
      }
    }

  },
  */

  /* COMPASS ---------------------------------------------------------------- */

    compass: {
      dev: {
        options: {
          config: 'config.rb',
          sassDir: './files/scss/',
          cssDir: '../dev/css/',
          outputStyle: 'nested'
        }   // options
      },     // dev

      prod: {
        options: {
          config: 'config.rb',
          // cssDir: '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/css/',
          cssDir: '../prod/css/',
          sassDir: './files/scss/',
        }   // options
      }
    },      // compass

  /* PREPROCESS ------------------------------------------------------------- */

  /**
   * Grunt task around preprocess npm module.
   *
   * @see https://github.com/onehealth/grunt-preprocess
   * @see https://github.com/onehealth/preprocess
   * @see http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
   */

    preprocess: {
      options: {
        context: {
          title : '<%= pkg.title %>',
          description : '<%= pkg.description %>',
          name : '<%= pkg.name %>',
          version : '<%= pkg.version %>',
          homepage : '<%= pkg.homepage %>',
          production : '<%= pkg.production %>',
          now : '<%= now %>',
          ver : '<%= ver %>',
        },
      },

      dev: {
        files: {
          '../dev/index.html' : './files/templates/index.html',
        }
      },

      prod: {
        files: {
          // '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/index.html' : './files/templates/index.html',
          // '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/bookmarks.html' : './files/templates/bookmarks.html',
          // '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/search.html' : './files/templates/search.html'
          '../prod/index.html' : './files/templates/index.html',
        }
      }
    },

  /* EMBED ------------------------------------------------------------------ */

  /**
   * Embed file content inline
   *
   * @see https://www.npmjs.org/package/grunt-embed
   */

  // embed: {
  //   prod: {
  //     options: { threshold: 0 },
  //     files: {
  //       '../prod/index.html':'../prod/index.html',
  //     }
  //   }
  // },

  /* COPY ------------------------------------------------------------------- */

  /**
   * Copy files and folders.
   *
   * @see https://github.com/gruntjs/grunt-contrib-copy
   * @see http://gruntjs.com/configuring-tasks#globbing-patterns
   */

  copy: {

    dev: {
      expand: true,
      cwd: './files/',
      src: [
        'fonts/**/*',
        'js/**/*'
      ],
      dest: '../dev/',
    },

    prod: {
      expand: true,
      cwd: './files/',
      src: [
        'fonts/**/*'
      ],
      // dest : '../prod/<%= pkg.version %>/<%= now %>/<%= ver %>/'
      dest : '../prod/'
    }
  },

  });       // initConfig

  //----------------------------------

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-devtools'); // https://github.com/vladikoff/grunt-devtools
  grunt.loadNpmTasks('grunt-embed');

  //----------------------------------

  grunt.registerTask('printenv', function () { console.log(process.env); });

  //----------------------------------

  grunt.registerTask('dev', ['env:dev', 'clean:dev', 'compass:dev', 'preprocess:dev', 'copy:dev',]);

  grunt.registerTask('prod', ['env:prod', 'clean:prod', 'compass:prod', 'uglify:prod', 'preprocess:prod', 'copy:prod',]); // 'embed:prod',

  grunt.registerTask('default', ['dev',]);


};          // exports