const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

/**
 * @author LancerAce
 * documentation: https://webpack.js.org/loaders/
 * @documentation node path.resolve and path.join: https://nodejs.org/api/path.html#path_path_resolve_paths
 * @param mode "production" | "development" | "none". production option minified bundle,wheras development option doesn't
 * @param output.path specify output directory of the result
 * @param output.publicpath specify the public URL of the output directory relative from the view of the HTML page.
 * @param output.filename allow code splitting, multiple creation of css,js file from webpack chunks. Does not affect output files for on-demand-loaded chunks
 * @param entry specify string | object | array
 * @param target important in order not to bundle built-in modules like path, fs, etc. default value = 'web'
 * @param regexp docs: https://www.regextester.com/104339  , https://www.rexegg.com/regex-quickstart.html
 * @param optimization docs: https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroups , docs:https://webpack.js.org/guides/code-splitting/#entry-points
 * @param plugins{MiniCssExtractPlugin} docs: MiniCssExtractPlugin gets your .css/scss in src folder and extracts it into a separate .css file in your ./dist directory for production.
 * For long term caching use filename: "[contenthash].css". Optionally add [name].
 *
 */

module.exports = {
  mode: "development",
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "./dist"), //tell webpack the directory where it output js,index.html to
    publicPath: "/", //the url of output.path shown in browser
    filename: "[name].bundle.js",
    sourceMapFilename: "[file].map",
    chunkFilename: "[name].bundle.js",
    hotUpdateChunkFilename: "[name].bundle.hot-update.js"
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  /* webpack boilerplate generated per chunks is approxiately 74.77kb.
   * Alway set priority value to prevent chunks rule from override against each other
   * commons chunk is of higher precedence if priority value is the same.
   */
  optimization: {
    //adds an additional chunk to each entrypoint containing only the runtime(webpack boilerplate etc). enable long term caching
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          enforce: true,
          priority: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/,
          chunks: "initial",
          priority: 10,
          enforce: true
        },
        dynamic_vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        //  exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "component")
        ],
        //array of entries,each entry contain a loader
        use: [
          {
            loader: "babel-loader",
            options: { cacheDirectory: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: { hot: true }
          },
	    {
            loader: "css-loader", //generating unique classname
            options: {
              importLoaders: 1, // if specifying more loaders
                modules: {
                  mode: "local",
                  localIdentName: "[path]___[name]__[local]___[hash:base64:5]" //babel-plugin-css-module format
                },
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              emitFile: true,
              name: "[name].[ext]",
              outputPath: (url, resourcePath, context) => {
                //https://www.regextester.com . Match any existing .[ext] in 0 or more nested directories. regexp.test(string)
                if (/([\\]?.*[\w]).(png|jpe?g|gif|svg)/.test(resourcePath)) {
                  console.log("image:"+url);
                  return `assets/images/${url}`;
                }
                else
                  console.log("fonts:" + url);
                  return `assets/fonts/${url}`;
              }
            }
          }
          /*{
            loader: "url-loader",
            options: { limit: 8192 }
          }*/ //url-loader seem to slow down compile time or hmr, comment out first
        ]
      }
    ] //end rule array
  }, //end module:
  devtool: "cheap-module-eval-source-map",
  resolve: {
    modules: ["node_modules", "component"],
    extensions: [".js", ".jsx", ".css"]
  },
  devServer: {
    //serve file to in-memory
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    openPage: 'home'
  },
  plugins: [
    new ExtractCssChunks({
        filename: "assets/[name].css",
        chunkFilename: "assets/[name].css", //dynamic import ES6 Code splitting
        orderWarning: true // Disable to remove warnings about conflicting order between imports
      }), new HtmlWebpackPlugin({
        title: "ReactTest",
        template: path.resolve(__dirname, "src/index.html")
      }),/*    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**//*", "!./assets"],
        cleanAfterEveryBuildPatterns: true,
        protectWebpackAssets: true
      }),*/
      new webpack.HotModuleReplacementPlugin(),
      new webpack.SourceMapDevToolPlugin(),
      new BundleAnalyzerPlugin(),
      /*    new WriteFilePlugin({
        test: /^(?!.*(hot)).*/
      /*  }),*/
  ]
};
