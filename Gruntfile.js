module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    path : {
      dist: 'dist',
      src : "src" 
    },

    //js hint
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'js/*.js', 'test/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          p: true,
          module: true
        }
      }
    },

    jasmine: {
      pivotal: {
        src: '<%= path.src %>/js/*.js',
        options: {
          specs: 'test/*Spec.js',
          helpers: 'test/*Helper.js'
        }
      }
    },

    karma: {
      options : {
        configFile: 'karma.conf.js' 
      },
      unit: {
        background: true
      },
      build: {
        background: false,
      }
    },

    watch: {
      karma: {
        files: [
          //'Gruntfile.js',
          '<%= path.src %>/js/*.js',
          'test/*.js'
          ],
        tasks: [
          'karma:unit'
          ]
      },
      //sass changes update navigator
      css:{
        files: ['<%= path.src %>/sass/*.scss'],
        tasks: ['sass'],
      } 
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= path.src %>/js/*.js',
        dest: '<%= path.dist %>/js/<%= pkg.name %>.min.js'
      }
    },

    //sass
    sass: {
      dist: {                            
        files: [{                         
          expand: true,// enable mapping dinamically
          cwd: '<%= path.src %>/sass', //set root directory
          src: ['*.scss'],
          dest: '../<%= path.dist %>/css',
          ext: '.css'
        }]  
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
            config: 'config.rb'   //load existing config
          }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', [
    'sass',
    'compass',
    'karma:unit',
    'watch'
  ]);

  grunt.registerTask('test', [
    //'jshint',
    'karma:unit',
    'watch'
  ]);

  grunt.registerTask('build', [
    'karma:build',
    'uglify',
    'sass'
  ]);
};