module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'app/compiled.js': [ 'app/compiled.js' ]
        },
        options: {
          mangle: false
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/app.js', 'app/modules/**/*.js', '!app/**/*.text.js'],
        dest: 'app/compiled.js'
      }
    },
    jshint: {
      all: [  'app/app.js', 'app/modules/**/*.js', 'tmp/*.js', '!app/**/*test.js' ],
      options:{
        reporter: require('jshint-stylish'),
        globalstrict: true,
        "globals": {
          "angular"   : false,
          "jasmine"   : false,
          "$"         : false,
          "_"         : false,
          "module"    : false,
          "require"   : false,
          "console"   : false
        }
      }
    },
    connect: {
      serverDev: {
        options: {
          hostname: 'localhost',
          port: 3000,
          baseDir: ['./'],
          open: {
            target: 'http://localhost:3000/app/index.html'
          }
        }
      }
    },
    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'app/*.js', 'app/modules/**/*.js', '*.html' ],
        tasks: [ 'jshint', 'concat:dist'],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'app/*.js', 'app/modules/**/*.js', '*.html' ],
        tasks: [ 'jshint', 'concat:dist', 'uglify:dist' ],
        options: {
          atBegin: true
        }
      }
    },
    compress: {
      dist: {
        options: {
          archive: 'dist/excerise3.zip'
        },
        files: [
        {
          src: [ 'index.html' ],
          dest: '/'
        },
        {
          src: [ 'dist/**' ],
          dest: 'dist/'
        }, {
          src: [ 'assets/**' ],
          dest: 'assets/'
        }, {
          src: [ 'libs/**' ],
          dest: 'libs/'
        }]
      }
    },
    cssmin: {
      build: {
        files: [{
          expand: true,
          dest: 'dist',
          src: ['app/**/*.css', '*.css']
        }]
      }
    },
    htmlmin: {
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          dest: 'dist',
          src: ['app/**/*.html']
        }]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      },
      continuous: {
        singleRun: false,
        autoWatch: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');


  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
  grunt.registerTask('dev', ['jshint', 'concat', 'uglify','connect:serverDev', 'watch:dev']);
  grunt.registerTask('test', ['jshint', 'concat', 'uglify','connect:serverDev', 'karma:unit']);


};