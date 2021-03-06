const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
  let devMode = argv.mode === "development";
  let devtool = devMode ? "source-map" : "nosources-source-map";
  return {
    devtool: devtool,
    mode: argv.mode,
    entry: {
      main: "./src/index.js",
    },
    devServer: {
      port: 8080,
      historyApiFallback: true,
      open: true,
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico"
      })

    ],
    output: {
      filename: devMode ? "main.js" : "[contenthash].main.js",
      path: path.resolve(__dirname, "build"),
      assetModuleFilename: "assets/[contenthash][ext][query]",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|jpe?g|svg|gif)$/i,
          type: "asset/resource",
        }
      ],
    },
  };
};
