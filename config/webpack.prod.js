const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
});