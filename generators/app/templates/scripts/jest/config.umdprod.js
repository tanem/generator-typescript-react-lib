const srcConfig = require('./config.src')

module.exports = Object.assign({}, srcConfig, {
  collectCoverage: false,
  moduleNameMapper: {
    '^../src$': `<rootDir>/umd/<%= packageName %>.production.min.js`
  }
})
