const path = require("path");
const cssExtract = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require("./package.json");

const commonConfig = {
  entry: {
    index: "./src/index.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    fallback: {
      timers: require.resolve("timers-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  plugins: [
    new cssExtract({
      filename: "styles.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [cssExtract.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [cssExtract.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.module\.css$/i,
        use: [
          cssExtract.loader,
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          cssExtract.loader,
          { loader: "css-loader", options: { modules: true } },
          "sass-loader",
        ],
      },
      {
        test: /\.(gif|png|avif|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: "9000",
    proxy: {
      "/openmrs": {
       target: "http://localhost:8080", 
       secure: false,
       changeOrigin: true,
       proxyTimeout: 130000,
      },
     },
  },
};

module.exports = commonConfig;
