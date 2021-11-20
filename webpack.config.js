// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8088,
  },
  resolve: {
    extensions: [".js"],
    alias: {
      Utils: path.resolve(__dirname, "src/utils"),
      Routes: path.resolve(__dirname, "src/routes"),
      Components: path.resolve(__dirname, "src/components"),
      Prepare: path.resolve(__dirname, "src/prepare"),
      Schema: path.resolve(__dirname, "src/schema"),
      Store: path.resolve(__dirname, "src/store"),
      Styles: path.resolve(__dirname, "src/styles"),
      Hooks: path.resolve(__dirname, "src/hooks"),
    },
    // fallback: {
    //   crypto: require.resolve("crypto-browserify"),
    //   buffer: require.resolve("buffer"),
    // },
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      title: "空",
      chunks: ["main"],
    }),

    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new CopyPlugin({
      patterns: [
        {
          from: "public",
        },
      ],
    }),
    new CompressionPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
      analyzerPort: 8888,
      reportFilename: "report.html",
      defaultSizes: "parsed",
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: "stats.json",
      statsOptions: null,
      logLevel: "info",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, ".cache"),
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
