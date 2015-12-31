module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v.<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg._release %>/<%= pkg.name %>.min.js'
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
          'dist/<%= pkg._release %>/<%= pkg.name %>.css':'src/<%= pkg.name %>.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'src/<%= pkg.name %>.scss',
        tasks: ['sass']
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['assets/*'],
          dest: 'dist/<%= pkg._release %>/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['uglify','sass', 'copy']);

};

