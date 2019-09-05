module.exports = {
    devServer: {
        proxy: {
            '^/api': {
              ////target: 'https://localhost:5001',
              target: 'https://elevation.azurewebsites.net',
              ws: true,
              changeOrigin: true
            }
          }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}