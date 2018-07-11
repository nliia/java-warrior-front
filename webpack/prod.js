const webpack = require("webpack"),
	path = require('path');

const plugins = {
	extractTextPlugin: require("extract-text-webpack-plugin"),
	definePlugin: webpack.DefinePlugin,
	depudePlugin: webpack.optimize.DedupePlugin,
	uglifyJs: webpack.optimize.UglifyJsPlugin,
	aggresiveMerging: webpack.optimize.AggressiveMergingPlugin,
	babelEnginePlugin: require('babel-engine-plugin')
};

function getConfig () {

	return {

		context: path.resolve(`${__dirname}/../`),

		devtool: "cheap-source-map",

		output: {
			publicPath: "/"
		},

		plugins: [
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			}),
			new plugins.babelEnginePlugin({
				presets: ['env', 'es2015', 'react', 'stage-0', 'stage-1']
			})
		]
	};

}

module.exports = getConfig();
