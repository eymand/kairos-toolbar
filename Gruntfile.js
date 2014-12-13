module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v.<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %> */\n'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['uglify']);

};

