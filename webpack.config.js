'use strict';

var DEV = true;

module.exports = {
	entry: ['whatwg-fetch', './dist/main.js'],
	output: {
		filename: 'build.js',
	},
	watch: true,
	devtool: DEV ? 'cheap-inline-module-source-map' : null
};