const webpack = require('webpack')
const { merge } = require('webpack-merge')

module.exports = {
  webpack: {
    // 修改webpack配置
    configure: config => {
      return merge(config, {
        module: {
          rules: [
            {
              test: /\.js$/,
              enforce: 'pre',
              use: ['source-map-loader'],
            },
          ],
        },
        plugins: [
          // Work around for Buffer is undefined:
          // https://github.com/webpack/changelog-v5/issues/10
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
          new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
        ],
        resolve: {
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify'),
            url: require.resolve('url'),
            buffer: require.resolve('buffer/'),
          },
        },
        ignoreWarnings: [/Failed to parse source map/],
      })
    },
  },
}
