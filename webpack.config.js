const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 8000,
    open: true,
    hot: true,
  },
  entry:{
    index: path.resolve(__dirname, 'src', 'index.js'),
    // novosti: path.resolve(__dirname, 'src', 'novosti.js'),
    // item: path.resolve(__dirname, 'src', 'item.js'),
    // webinars: path.resolve(__dirname, 'src', 'webinars.js'),
    // lesson: path.resolve(__dirname, 'src', 'lesson.js'),
    // provisions: path.resolve(__dirname, 'src', 'provisions.js'),
    // rules: path.resolve(__dirname, 'src', 'rules.js'),
    // page404: path.resolve(__dirname, 'src', 'page404.js'),
    // page403: path.resolve(__dirname, 'src', 'page403.js'),
    // results: path.resolve(__dirname, 'src', 'results.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].js',
    assetModuleFilename: 'img/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
			chunks: ['index'],
		}),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'novosti.html'),
    //   filename: 'novosti.html',
		// 	chunks: ['novosti'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'item.html'),
    //   filename: 'item.html',
		// 	chunks: ['item'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'webinars.html'),
    //   filename: 'webinars.html',
		// 	chunks: ['webinars'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'lesson.html'),
    //   filename: 'lesson.html',
		// 	chunks: ['lesson'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'provisions.html'),
    //   filename: 'provisions.html',
		// 	chunks: ['provisions'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'rules.html'),
    //   filename: 'rules.html',
		// 	chunks: ['rules'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'page404.html'),
    //   filename: 'page404.html',
		// 	chunks: ['page404'],
		// }),
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'page403.html'),
    //   filename: 'page403.html',
		// 	chunks: ['page403'],
		// }), 
    // new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src', 'results.html'),
    //   filename: 'results.html',
		// 	chunks: ['results'],
		// }),
    
    
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, 'src/img'),
            to:   path.resolve(__dirname, 'dist/img')
          }
        ]
      })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          // 'group-css-media-queries-loader',
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: devMode
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
        type: 'asset/resource',
      },
    ],
  },

};