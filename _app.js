const Server = require('./src/_server.js')
const port = (process.env.PORT || 8000)
const app = Server.app();

if (process.env.NODE_ENV !== 'production') {

  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.deployment.config.js')
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist
  }))

}

app.listen(port);