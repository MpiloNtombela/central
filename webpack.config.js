const path = require("path");

module.exports = (env, argv) => {
  let devMode = argv.mode === "development";
  let devtool = devMode ? "source-map" : "nosources-source-map";
  return {
    devtool: devtool,
    entry: {
      main: "./src/js/index.js",
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "./wwwroot/dist"),
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
        // {
        //     test: /\.s[ac]ss$/,
        //     use: [
        //       "style-loader",
        //       "css-loader",
        //       "sass-loader",
        //     ],
        // },
      ],
    },
  };
};
