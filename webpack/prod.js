const pp = require("project-paths"),
	webpack = require("webpack");

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

		context: pp.root(),

		devtool: "cheap-source-map",

		node: {
			fs: 'empty',
			net: 'empty'
		},

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
