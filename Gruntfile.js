module.exports = function(grunt) {grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-nodeunit');

// Project configuration. 
grunt.initConfig({
    concat: {
   
      css1: {
        src: ['public/Views/Styles/Chat.css','public/Views/Styles/Responsive.css'],
        dest: 'Build/Public/Main.css',
      },
      css2: {
        src: ['public/Views/Styles/Chat.css','public/Views/Styles/Responsive.css'],
        dest: 'public/Views/Styles/Main.css',
      },
    },
    nodeunit: {
        all: ['*.js'],
        options: {
          reporter: 'junit',
          reporterOptions: {
            output: 'outputdir'
          }
        }
      },
    uglify: {
        JS: {
          files: {
            'Build/Public/Main.min.js': ['public/Views/Controller/Chat.js'],
            'public/Views/Controller/Chat.min.js': ['public/Views/Controller/Chat.js']
          }
        }
        },
        autoprefixer:{
            css1: {
            
                'public/Views/Styles/Chat.css':'public/Views/Styles/Chat.css',
                'public/Views/Styles/Responsive.css':'public/Views/Styles/Responsive.css'
        }
    },
    watch: {
        scripts: {
          files: ['*.js','public/Views/Styles/*.css','public/Views/Controller/*.js'],
          tasks: ['Execute'],
          
        },
      },
<<<<<<< HEAD
  });

  grunt.registerTask('Execute', ['autoprefixer', 'uglify', 'concat']);
}
=======
      jshint: {
        all: ['*.js','public/Views/Controller/chat.js']
      }
  });

  grunt.registerTask('Execute', ['autoprefixer', 'uglify', 'concat']);
  grunt.registerTask('jshint', ['jshint']);
};
>>>>>>> Adding to ncylc
