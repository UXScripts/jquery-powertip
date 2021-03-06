/**
 * PowerTip Grunt Config
 */

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*!\n' +
			' <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' <%= pkg.homepage %>\n' +
			' Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>).\n' +
			' Released under <%= _.pluck(pkg.licenses, "type").join(", ") %> license.\n' +
			' <%= _.pluck(pkg.licenses, "url").join("\n") %>\n' +
			'*/'
		},
		concat: {
			dist: {
				src: [
					'<banner:meta.banner>',
					'<file_strip_banner:src/intro.js>',
					'<file_strip_banner:src/core.js>',
					'<file_strip_banner:src/csscoordinates.js>',
					'<file_strip_banner:src/displaycontroller.js>',
					'<file_strip_banner:src/placementcalculator.js>',
					'<file_strip_banner:src/tooltipcontroller.js>',
					'<file_strip_banner:src/utility.js>',
					'<file_strip_banner:src/outro.js>'
				],
				dest: 'dist/jquery.powertip-<%= pkg.version %>.js'
			}
		},
		min: {
			dist: {
				src: [
					'<banner:meta.banner>',
					'<config:concat.dist.dest>'
				],
				dest: 'dist/jquery.powertip-<%= pkg.version %>.min.js'
			}
		},
		qunit: {
			files: [
				'test/index.html'
			]
		},
		lint: {
			dist: 'dist/jquery.powertip-<%= pkg.version %>.js',
			grunt: 'grunt.js',
			tests: 'test/**/*.js'
		},
		watch: {
			files: [
				'<config:lint.grunt>',
				'<config:lint.tests>',
				'src/**/*.js'
			],
			tasks: 'lint:grunt lint:tests concat lint:dist'
		},
		jshint: {
			dist: {
				options: {
					curly: true,
					eqeqeq: true,
					immed: true,
					newcap: true,
					noarg: true,
					sub: true,
					undef: true,
					boss: true,
					eqnull: true,
					browser: true,
					smarttabs: true
				},
				globals: {
					jQuery: true
				}
			},
			tests: {
				options: {
					curly: true,
					eqeqeq: true,
					immed: true,
					latedef: true,
					newcap: true,
					noarg: true,
					sub: true,
					undef: true,
					boss: true,
					eqnull: true,
					browser: true,
					smarttabs: true
				},
				globals: {
					$: true,
					module: true,
					expect: true,
					test: true,
					asyncTest: true,
					ok: true,
					equal: true,
					notEqual: true,
					deepEqual: true,
					notDeepEqual: true,
					strictEqual: true,
					notStrictEqual: true,
					start: true
				}
			},
			grunt: {
				options: {
					curly: true,
					eqeqeq: true,
					immed: true,
					latedef: true,
					newcap: true,
					noarg: true,
					sub: true,
					undef: true,
					boss: true,
					eqnull: true
				},
				globals: {
					module: true
				}
			}
		},
		uglify: {}
	});

	grunt.registerTask('default', 'lint:grunt lint:tests concat lint:dist qunit min');

	grunt.registerTask('travis', 'lint:grunt lint:tests concat lint:dist qunit');

};
