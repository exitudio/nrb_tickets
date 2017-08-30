process.noDeprecation = true; // for close warning in webpack 2.2.1 [https://github.com/vuejs/vue-loader/issues/666]
const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../views/index.html'),
  filename: 'index.html',
  inject: 'body'
})

const eslintFormatter = require('react-dev-utils/eslintFormatter')

const LiveReloadPlugin = require('webpack-livereload-plugin')
const options = { appendScriptTag: true }

module.exports = {
  /* entry: [
    "babel-polyfill", 
    // './views/index.js',
  ], */
  entry: {
    index: paths.appViews,
  },
  module: {
    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appViews,
      },
      // ** ADDING/UPDATING LOADERS **
      // The "file" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "file" loader.

      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appViews,
        loader: require.resolve('babel-loader'),
        query: {
          presets: [
            'react',
            [
              'es2015',
              {
                "modules": false //<< Tree shaking
              }
            ],
            'stage-2',

          ],
          plugins: ['transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        include: paths.appViews,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ],
  },
  output: {
    path: paths.appPublic,
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new LiveReloadPlugin(options)
  ]
}