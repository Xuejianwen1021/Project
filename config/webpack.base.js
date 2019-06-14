const path = require('path');
const APP_PATH = path.resolve(__dirname, '../app');
const DIST_PATH = path.resolve(__dirname, '../dist');
module.exports = {
    devtool: 'source-map',
    entry: {
    
        app: './app/index.js'
    },    
    output: {
        filename: 'js/bundle.js',
        path: DIST_PATH
    },

    devServer: {
        contentBase:"./public",
        historyApiFallback: true,
        inline: true,
        query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: "babel-loader",
                include: APP_PATH,
            },
            { test: /\.css$/, use: 'css-loader', 
            use: ['style-loader','css-loader']
        },
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test:/\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]',
            options:{
                publicPath:"/url-loader-test/dist/"
            }
              }
            
        ]
    },
  
};
