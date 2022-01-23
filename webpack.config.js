const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
  let devMode = argv.mode === "development";
  let devtool = devMode ? "source-map" : "nosources-source-map";
  console.log(argv.mode)
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
      filename: "main.js",
      path: path.resolve(__dirname, "./public/dist"),
      publicPath: "/"
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
      ],
    },
  };
};
