'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./your-new-react-library.cjs.production.js')
} else {
  module.exports = require('./your-new-react-library.cjs.development.js')
}
