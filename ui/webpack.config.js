var path = require("path");

module.exports = {
    mode: 'development',
  context: __dirname,
  entry: "./app/index.jsx",
  output: {
    path: path.join(__dirname),
    filename: "app.js"
  },
  module: {
      rules: [
        {
          test: [/\.jsx$/, /\.js$/],
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["env", "react"]
            }
          }
        }
      ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx" ]
  }
};
