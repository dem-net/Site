module.exports = {
    devServer: {
        proxy: {
            '^/api': {
              target: process.env.VUE_APP_API_BASEURL,
              ws: true,
              changeOrigin: true
            }
          }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}