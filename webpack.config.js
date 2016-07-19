var getConfig = require('hjs-webpack')
var isDev = process.env.NODE_ENV !== 'production'

module.exports = getConfig({
  in: 'src/index.js',
  out: 'build',
  clearBeforeBuild: '!(img)',
  isDev: isDev
})
