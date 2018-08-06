'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/<%= packageName %>.production.min.js')
} else {
  module.exports = require('./cjs/<%= packageName %>.development.js')
}
