const toCamelCase = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.substring(1)

const removeWhiteSpace = (s) => s.replace(/\s+/g, '')

module.exports = {
  capitalize,
  toCamelCase,
  removeWhiteSpace,
}
