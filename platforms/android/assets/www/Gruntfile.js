'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        docroot: 'docroot/',
        css: '<%= yeoman.docroot %>/css',
        fonts: '<%= yeoman.docroot %>/fonts',
        sass: '<%= yeoman.docroot %>/sass',
        img: '<%= yeoman.docroot %>/img',
        js: '<%= yeoman.docroot %>/js',
        app: 'app',
        dist: '<%= yeoman.docroot %>/dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
				livereload: true
            },
            compass: {
                files: ['<%= yeoman.sass %>/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '{,*/}/*.html',
                    '{<%= yeoman.sass %>}/{,*/}*.sass',
                    '{,*/}*.html',
                    '<%= yeoman.js %>/{,*/}*.js',
                    '<%= yeoman.img %>/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            jst: {
                files: [
                    '<%= yeoman.js %>/templates/*.ejs'
                ],
                tasks: ['jst']
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.sass %>',
                cssDir: '<%= yeoman.dist %>/css',
                imagesDir: '<%= yeoman.img %>',
                javascriptsDir: '<%= yeoman.js%>',
                fontsDir: '<%= yeoman.fonts %>/fonts',
                importPath: '<%= yeoman.docroot %>/bower_components',
                relativeAssets: true,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    cssPath: '<%= yeoman.docroot %>/css',
                    debugInfo: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: '<%= yeoman.js %>/{,**/}*.js',
                dest: '<%= yeoman.docroot %>dist/js/live.js'
            }
        },
        clean: {
            dist: ['dist', '<%= yeoman.dist %>/*'],
            dev: 'docroot/dist'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.js %>/{,*/}*.js',
                '!<%= yeoman.js %>/vendor/*'
            ]
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%= yeoman.js %>',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    '<%= yeoman.docroot %>dist/js/live.js': ['<%= yeoman.docroot %>dist/js/live.js']
                }
            }
        },
        useminPrepare: {
            html: 'views/shell.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
//            html: ['views/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>/']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.img %>',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.docroot %>/dist/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/css/style.css': [
                        '<%= yeoman.css %>/{,*/}*.css'
//                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ],
                    ext: '.min.css'
                }
            },
            dev: {
                files: {
                    '<%= yeoman.css %>/style.css': [
                        '<%= yeoman.css %>/{,*/}*.css'
//                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: 'views',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'views',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        '<%= yeoman.img %>/{,*/}*.{webp,gif}'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.js %>/rjsConfig.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '<%= yeoman.dist %>/js/templates.js': ['<%= yeoman.js %>/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/js/{,*/}*.js',
                        '<%= yeoman.dist %>/css/{,*/}*.css',
                        '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/fonts/*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('docroot/dist/js/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('dev', function () {

        grunt.task.run([
            'clean:dev',
            'createDefaultTemplate',
            'jst',
            'compass:dev',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:dev',
        'createDefaultTemplate',
        'jst',
        'uglify',
        'compass'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
//        'requirejs',
        'imagemin',
//        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
//        'jshint',
        'test',
        'build'
    ]);
};
