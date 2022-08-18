const path = require("path");
var LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  entry: "./index.ts",
  mode: "developmesnt",
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.glsl$/i,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new LiveReloadPlugin({ port: 4200 })],
};
