import express from 'express'
import path from 'path'

const port = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// `npm run start:prod` sets NODE_ENV=production and then ran this file, which loaded
// config/webpack.dev.js and applied webpack-dev-middleware and webpack-hot-middleware
// unconditionally. So the production script started the development pipeline, rebuilding
// from source in memory with hot reloading attached, and NODE_ENV was decoration.
//
// Now the two paths differ. In production this serves the files that `npm run build:prod`
// wrote to public/ and nothing else; in development it keeps the middleware, which is the
// point of running this server rather than webpack-dev-server.
if (!isProduction) {
  // Required here rather than at the top so production never loads webpack at all.
  const webpack = require('webpack')
  const config = require('./config/webpack.dev.js')
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, config.devServer))

  // It must be before static middleware
  app.use(require('webpack-hot-middleware')(compiler))
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} (${isProduction ? 'production' : 'development'})`)
})

server.on('error', (error) => {
  console.error(`Cannot listen on ${port}: ${error.message}`)
  process.exitCode = 1
})
