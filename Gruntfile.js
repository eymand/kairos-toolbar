module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v.<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name + "-" + pkg.version %>.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js','src/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> v.<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n',
          sourcemap: 'none',
          style: 'expanded'
        },
        files: {
          'dist/kairos-toolbar.css':'src/kairos-toolbar.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'src/kairos-toolbar.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['uglify','sass']);

};

