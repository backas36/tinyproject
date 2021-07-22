const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development', //預設是 production，也可以填入 development
  entry: './src/index.js', //程式入口點
  output: {
    filename: 'main.js', //輸出檔案的名稱 
    path: path.resolve(__dirname, 'dist'), // 現在資料夾底下的 dist
    library: "commentPlugin",
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};