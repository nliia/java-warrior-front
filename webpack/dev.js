const pp = require("project-paths"),
	webpack = require("webpack"),
	projectMeta = require(pp.get("configs", "project.meta.js"));

const plugins = {
	hotModuleReplacement: webpack.HotModuleReplacementPlugin,
	extractTextPlugin: require("extract-text-webpack-plugin"),
	htmlWebpackPlugin: require('html-webpack-plugin'),
	environment: webpack.EnvironmentPlugin
};

function getConfig () {

	return {

		context: pp.get("/"),

		devtool: "eval",

		output: {
			publicPath: "/"
		},

		devServer: {
			contentBase: pp.get("build"),
			hot: true,
			inline: true,
			quiet: false,
			noInfo: false,
			disableHostCheck: true,
			stats: {
				assets: false,
				colors: true,
				version: false,
				hash: false,
				timings: false,
				chunks: false,
				chunkModules: false
			},
			historyApiFallback: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
			}
		},

		plugins: [
			new plugins.environment({...process.env})
		]
	};
}

module.exports = getConfig();
