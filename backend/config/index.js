var config

if (process.env.NODE_ENV === 'production') {
  config = require('./dev')
} else {
  config = require('./dev')
}
config.isGuestMode = true

module.exports = config
