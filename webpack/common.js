const pp = require("project-paths"),
  path = require("path"),
  projectMeta = require(pp.getA("configs", "project.meta.js")),
  webpack = require('webpack');

const plugins = {
  extractTextPlugin: require("extract-text-webpack-plugin"),
  htmlWebpackPlugin: require("html-webpack-plugin"),
  // definePlugin: require("webpack").DefinePlugin,
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
  const dependencies = Object.keys(require(pp.getA("/", "package.json")).dependencies || {});

  // входные точки для webpack
  let entry = {
    "app": pp.getA("src", "client.tsx")
  };

  if (dependencies.length) entry["vendors"] = dependencies;

  return {
    entry,

    output: {
      path: pp.getA("build"),
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
      modules: [pp.get("/", "node_modules")],
      alias: {
        fonts: pp.getA("assets", "fonts"),
        img: pp.getA("assets", "img"),
        styles: pp.getA("assets", "styles"),
        utils: pp.getA("src", "utils")
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
          include: pp.getA("src")
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
                // require.resolve('babel-preset-env'),
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
        template: pp.get("templates", "index.ejs")
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
	babelrc: true,
	// extends: pp.getA("/", ".babelrc")
}
