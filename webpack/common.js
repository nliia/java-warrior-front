const path = require("path"),
  projectMeta = require('../configs/project.meta'),
  webpack = require('webpack');

const plugins = {
  extractTextPlugin: require("extract-text-webpack-plugin"),
  htmlWebpackPlugin: require("html-webpack-plugin"),
  clean: require("webpack-cleanup-plugin")
};

/**
 * Возвращает общие настройки webpack
 * которые свойственны всем видам окружения
 * @param env Текущее окружение
 * @returns WebpackConfigObject
 */
module.exports = function(env) {

  // Список зависимостей из файла package.json
  // для записи в отдельный файл vendors.
  const dependencies = Object.keys(require(path.resolve(`${__dirname}/../package.json`)).dependencies || {});

  // входные точки для webpack
  let entry = {
    "app": path.resolve(`${__dirname}/../src/client.tsx`)
  };

  if (dependencies.length) entry["vendors"] = dependencies;

  return {
    entry,

    output: {
      path: '/build',
      filename: path.join("[name].js"),
      chunkFilename: "[id].[hash].js"
    },

    target: 'web',

    node: {
      fs: 'empty',
      net: 'empty'
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".sass", ".scss", ".vue"],
      modules: ['node_modules'],
      alias: {
        fonts: path.resolve(`${__dirname}/../src/assets/fonts`),
        img: path.resolve(`${__dirname}/../src/assets/img`),
        styles: path.resolve(`${__dirname}/../src/assets/styles`),
        utils: path.resolve(`${__dirname}/../src/utils`)
      }
    },

    module: {
      rules: [
        {
          test: /\.ejs$/,
          loader: "ejs-loader"
        },

        {
          test: /\.json$/,
          loader: "json-loader",
          exclude: [/node_modules/]
        },

        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
        },

        {
          test: /\.jsx?$/,
          loader: "react-hot-loader/webpack",
          include: path.resolve(`${__dirname}/../src`)
        },

        {
          test: /\.json$/,
          loader: "json-loader",
          exclude: [/node_modules/],
        },

        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: {
            loader: `babel-loader`,
            options: {
              babelrc: true,
              presets: [
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-stage-0'),
                require.resolve('babel-preset-stage-1'),
              ],
              plugins: [
                require.resolve('babel-plugin-transform-rebem-jsx')
              ],
            }
          }
        },

        {
          test: /\.s[ac]ss$/,
          use: (env == "development" ? ["css-hot-loader"] : []).concat(
            plugins.extractTextPlugin.extract({
              fallback: "style-loader",
              use: 'css-loader!group-css-media-queries-loader!resolve-url-loader!sass-loader?sourceMap!sass-bulk-import-loader'
            })
          )
        },

        {
          test: /\.css$/,
          use: (env == "development" ? ["css-hot-loader"] : []).concat(
            plugins.extractTextPlugin.extract({
              fallback: "style-loader",
              use: ["css-loader"]
            })
          )
        },

        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png$|\.jpe?g$|\.gif$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            outputPath: "public/",
            publicPath: "/public"
          }
        },

        {
          test: /\.DS_Store/,
          loader: "ignore-loader"
        }
      ]
    },

    plugins: [
      new plugins.extractTextPlugin('./public/styles/[name].css', {
        allChunks: true,
        disable: env == "development"
      }),
      new plugins.htmlWebpackPlugin({
        ...projectMeta,
        filename: "index.html",
        chunks: ["vendors", "app"],
        template: path.resolve(`${__dirname}/../src/templates/index.ejs`)
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env),
          REBEM_MOD_DELIM: JSON.stringify('--'),
          REBEM_ELEM_DELIM: JSON.stringify('__')
        }
      }),
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
    ],
  };
};


const babelSettings = {
	babelrc: true
}
