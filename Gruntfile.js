module.exports = function(grunt) {
  //загрузка всех tasks
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      dev: {
        files: {
          // компилируем less - куда:откуда
          "build/css/style.css": "src/less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer") ({
            browsesrs:
            [
            "last 1 versions",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
            ]
          }),
          require("css-mqpacker") ({
            sort: true
          })
        ]
      },
      //какой файл
      style: {src: "build/css/*.css"}
    },

    //минифицируем css
    csso: {
      stylecompress: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css" : ["build/css/style.css"]
        }
      }
    },

    //минифицируем изображения
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png, jpg, gif}"]
        }]
      }
    },

    // //собираем svg срайт
    // svgstore: {
    //   options: {
    //     svg: {
    //       //прячем инлайн svg из html
    //       style: "display: none"
    //     }
    //   },
    //   //название конфига
    //   symbols: {
    //     files: {
    //       "build/img/symbols.svg" : ["src/img/icons/*.svg"]
    //     },
    //     options: {
    //     prefix : 'icon-', // This will prefix each ID
    //     svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
    //       viewBox : '0 0 100 100',
    //       xmlns: 'http://www.w3.org/2000/svg'
    //     }
    //   }
    //   }
    // },

    // //минифицируем svg
    // svgmin: {
    //   symbols: {
    //     files: [{
    //       expand: true,
    //       src: ["build/img/icons/*.svg"]
    //     }]
    //   }
    // },

    // следим за изменениями
    watch: {
      style: {
        // изменились less файлы запускаем tasks
        files: ["src/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      },
      // html: {
      //   files: ["src/*.html"],
      //   tasks: ["copy:html"]
      // },
      pug: {
        files: ["src/*.pug"],
        tasks: ["pug"]
      },
      img: {
        files: ["src/img/**/*.*"],
        tasks: ["build"]
      },
      rigger: {
        files: ["src/js/**/*.*"],
        tasks: ["rigger"]
      }
    },

    // копирование
    copy: {
      build: {
        files: [{
          expand: true,
          //makes all src relative to cwd (относительно какой папки брать())
          cwd: 'src/',
          src: [
          // "fonts/**/*.{woff,woff2}",
          "fonts/**/*.*",
          "img/**"
          // ,
          // "js/**"
          // ,
          // "*.html"
          ],
          //куда копировать
          dest: "build"
        }]
      }
      // ,
      // html: {
      //   files: [{
      //     expand: true,
      //     src: ["src/*.html"],
      //     dest: "build"
      //   }]
      // }
    },

    //удаляем папку перед копированием
    clean: {
      build: ["build"]
    },


    // live-server local host
    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    "build/**/*.*"
                ]
            },
            options: {
                watchTask: true,
                server: "build/.",
								directory: true
            }
        }
    },

    pug: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          expand: true,
          cwd: 'src/',
          src: ['*.pug'],
          dest: 'build',
          ext: '.html'
        }
    },

    rigger: {
      compile: {
        // options: {
        //   banner: '/* THIS BANNER USES TEMPLATE FUNCTIONALITY <%= banner_property %> */\n',
        //   footer: '\n/* SOME FOOTER */'
        // },
        files: {
          'build/js/main.js': ['src/js/main.js']
        }
      }
    }

  });



    grunt.registerTask("serve", ["browserSync", "watch"]);
    // grunt.registerTask("symbols", ["svgmin", "svgstore"]);
    grunt.registerTask("build", [
      "clean",
      "copy",
      "less",
      "postcss",
      "csso",
      // "symbols",
      "imagemin",
      "pug",
      "rigger"
      ]);

};
